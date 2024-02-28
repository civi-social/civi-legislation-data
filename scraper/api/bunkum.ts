import { isBefore, subDays } from "date-fns";
import { CiviLegislationData } from "../../api";

const date180DaysAgo = subDays(new Date(), 180);

const DB_URL = "https://puddle.bunkum.us/chicago_council-f475729.json?sql=";

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

const urlForBills = createSQLUrl(`
  SELECT b.*, ba.classification AS action_classification, ba.date AS action_date
  FROM bill AS b
  JOIN (
      SELECT bill_id, classification, date
      FROM billaction
      WHERE (bill_id, date) IN (
          SELECT bill_id, MAX(date) AS max_date
          FROM billaction
          GROUP BY bill_id
      )
  ) AS ba ON b.id = ba.bill_id
  CROSS JOIN json_each(b.classification) AS c
  WHERE json_extract(b.extras, '$.routine') = false
    AND c.value = 'resolution'
  ORDER BY b.updated_at DESC
  LIMIT 50;
`);

// console.log(getUrlForBillSponsors("ocd-bill/79a8428f-4b3d-461c-9884-e67fc66f43c5"))

type Bill = {
  id: string;
  title: string;
  extras: string; // is stringified json
  action_classification: string;
  action_date: string;
  classification: string;
};

type BillVote = {
  id: string;
  bill_id: string;
  result: string;
  created_at: string;
};

type BillSponsor = {
  id: string;
  bill_id: string;
  name: string;
  person_id: string;
};

async function getChicagoBills() {
  console.log("Getting Chicago Bills")
  const billsResult = await axios.get(urlForBills);
  const bills = billsResult.rows as Bill[];
  const billIds = bills.map((bill) => bill.id);
 
  console.log("Getting Chicago Bill Sponsors")

  const sponsorsResul = await axios.get(getUrlForBillSponsors(billIds));
  const sponsors = sponsorsResult.rows as BillSponsor[];

  console.log("Getting Chicago Bill Vote Events")
  const voteEventsResult = await axios.get(getUrlForVoteEvents(billIds));
  const votes = voteEventsResult.rows as BillVote[];

  const results = bills.map((bill) => {
    // const billVote = vote.find(voteItem => voteItem.bill_id === bill.id);
    const voteHistory = votes
      .filter((vote) => vote.bill_id === bill.id)
      .map((voteItem) => ({
        result: voteItem.result,
        created_at: voteItem.created_at,
      }));

    // We default to unknown if as sometimes there is no action_classification or vote history.
    let status = "Unknown";
    // Check the most recent vote
    // todo: we should probably be smarter about this a check by the date.
    const recentVote = voteHistory[voteHistory.length - 1];
    // if there is a recent vote, use that result
    if (recentVote) {
      status = recentVote.result;
    }
    // if it's older than 180 days with no updates, then call it stale
    else if (isBefore(new Date(bill.action_date), date180DaysAgo)) {
      status = "Stale";
    }
    // otherwise, if there is a action_classification, use that
    else if (
      typeof bill.action_classification === "string" &&
      bill.action_classification.length > 0
    ) {
      status = bill.action_classification;
    }
    // Sometimes the status may be an array
    try {
      const parsed = JSON.parse(status);
      // todo: if there are other items, should we do something with it?
      status = parsed[0];
    } catch (e) {
      // We ignore the error and assume its a normal string
    }

    let classification = "";
    try {
      classification = JSON.parse(bill.classification)[0];
    } catch (e) {
      // ignore error
    }

    return {
      id: bill.id,
      title: bill.title,
      tags: JSON.parse(bill.extras).topics,
      status,
      updated_at: bill.action_date,
      statusDate: `${bill.action_date} - ${status}`,
      sponsors: sponsors
        .filter((billSponsor) => billSponsor.bill_id === bill.id)
        .map((billSponsor) => ({
          name: billSponsor.name,
          person_id: billSponsor.person_id,
          role: "", // todo
          district: "", // todo
        })),
      voteHistory,
      link: "", // todo
      source_id: "", // todo
      classification,
    } as CiviLegislationData;
  });

  return results;
}

export const bunkum = {
  getChicagoBills,
};
