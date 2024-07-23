import { isBefore, subDays } from "date-fns";
import { CiviLegislationData } from "../../api";

const date180DaysAgo = subDays(new Date(), 180);

const DB_URL = "https://puddle.datamade.us/chicago_council-dd53412.json?sql=";

const createSQLUrl = (sql: string) => {
  return `${DB_URL}${encodeURIComponent(sql)}`;
};

const getUrlForBillSponsors = (bill_ids: string[]) => {
  return createSQLUrl(`
  SELECT * from billsponsorship
    WHERE billsponsorship.bill_id IN (${bill_ids
      .map((billId) => `'${billId}'`)
      .join(", ")})
  `);
};

const getUrlForVoteEvents = (bill_ids: string[]) => {
  return createSQLUrl(`
  SELECT * from voteevent
    WHERE voteevent.bill_id IN (${bill_ids
      .map((billId) => `'${billId}'`)
      .join(", ")})
  `);
};

/**
 * Fetching in chunks because bunkum has API limits.
 * Another thing to note: bunkum will slow down get requests over frequents requests.
 */
const fetchBillsInChunks = async () => {
  const chunkSize = 130;
  let offset = 0;
  let done = false;
  let totalResults: Bill[] = [];

  console.log("Fetching Chicago data in chunks");

  // starting from the first row of the bill table we get 100 results at a time
  while (!done) {
    const query = `
      SELECT b.*, 
        ( SELECT json_group_array(
            json_object(
              'date', date, 
              'classification', json_extract(classification, '$[0]')
            )
          ) as actions 
          FROM billaction as ba 
          WHERE ba.bill_id == b.id 
          ORDER BY 'order'
        ) as actions
      FROM bill AS b
      WHERE json_extract(b.extras, '$.routine') = false
      AND b.updated_at >= date('now', '-6 months')
      ORDER BY b.updated_at DESC
      LIMIT ${chunkSize} OFFSET ${offset};
    `;

    const response = await fetch(createSQLUrl(query));

    const data = await response.json();
    const chunk = data.rows as Bill[];

    totalResults = totalResults.concat(chunk);

    // Fetch sponsors for current chunk
    const sponsorRes = await fetch(
      getUrlForBillSponsors(chunk.map((bill) => bill.id))
    );

    let sponsorsResultJson: any = {};
    try {
      sponsorsResultJson = await sponsorRes.json();
    } catch (e) {
      console.error("Error fetching sponsors", e);
      console.log("ResponseText", sponsorRes.text());
      process.exit(1);
    }

    const sponsors = sponsorsResultJson.rows;

    // Fetch vote events for current chunk
    const voteEventRes = await fetch(
      getUrlForVoteEvents(chunk.map((bill) => bill.id))
    );
    const voteEventsResultJson = await voteEventRes.json();
    const votes = voteEventsResultJson.rows;

    // Add sponsors and vote history to each bill
    chunk.forEach((bill) => {
      bill.sponsors = sponsors.filter(
        (sponsor: Sponsor) => sponsor.bill_id === bill.id
      );
      bill.voteHistory = votes.filter((vote: Vote) => vote.bill_id === bill.id);
    });

    offset += chunkSize;

    console.log(
      `Fetched ${chunkSize} bills. Total bills: ${totalResults.length}`
    );

    if (chunk.length < chunkSize) {
      done = true;
    }
  }

  console.log(
    `Done fetching Chicago Bills. Total bills: ${totalResults.length}`
  );

  return totalResults;
};

type Sponsor = {
  name: string;
  person_id: string | null;
  role: string;
  district: string;
  bill_id: string;
};

type Vote = {
  motion_classification: string[];
  created_at: string;
  bill_id: string;
};

type Bill = {
  id: string;
  title: string;
  extras: string; // is stringified json
  actions: string;
  classification: string;
  identifier: string;
  link: string;
  url: string;
  status: string[]; // is stringified json
  statusDate: string;
  source_id: string;
  sponsors: Sponsor[];
  voteHistory: Vote[];
};

async function getChicagoBills() {
  console.log("Getting Chicago Bills");
  const billsRes = (await fetchBillsInChunks()) || [];
  const results = billsRes.map((bill) => {
    //can status be set to an array?
    let status = ["Unknown"];
    const actions = JSON.parse(bill.actions);
    const last_action = actions.at(-1);
    const action_date = last_action.date;
    const recentVote = bill.voteHistory[bill.voteHistory.length - 1];
    // setting status as value in voteHistory.motion_classification if there is one
    if (recentVote && recentVote.motion_classification) {
      status = recentVote.motion_classification;
    } else if (isBefore(new Date(action_date), date180DaysAgo)) {
      status = ["Stale"];
    } else if (
      typeof last_action.classification === "string" &&
      last_action.classification.length > 0
    ) {
      status = last_action.classification;
    }

    let classification = "";
    try {
      classification = JSON.parse(bill.classification)[0];
    } catch (e) {
      // We ignore the error
    }

    const bills: CiviLegislationData = {
      id: bill.id,
      title: bill.title,
      tags: JSON.parse(bill.extras).topics,
      status,
      updated_at: action_date,
      statusDate: `${action_date} - ${status}`,
      sponsors: bill.sponsors.map((sponsor) => ({
        name: sponsor.name,
        person_id: sponsor.person_id,
        role: "", // todo
        district: "", // todo
      })),
      voteHistory: bill.voteHistory.map((voteItem) => ({
        motion_classification: voteItem.motion_classification,
        created_at: voteItem.created_at,
      })),
      source_id: "", // todo
      classification,
      identifier: bill.identifier,
      link: `https://chicago.councilmatic.org/legislation/${bill.identifier}`,
      url: `https://chicago.councilmatic.org/legislation/${bill.identifier}`,
    };

    return bills;
  });

  return results;
}

export const councilmatic = {
  getChicagoBills,
};
