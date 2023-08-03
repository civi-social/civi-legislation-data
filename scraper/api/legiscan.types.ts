// https://api.legiscan.com/dl/LegiScan_API_User_Manual.pdf
export const STATUS_MAP: { [k: string]: string } = {
  "1": "Introduced",
  "2_Rep": "Passed House",
  "2_Sen": "Passed Senate",
  "3": "Passed House and Senate",
  "4": "Became Law",
  "5": "Vetoed",
  "9": "To Committee"

  /*
  Understanding the LegiScan Status options
  1. Introduced = Newly introduced bill
  2. Engross = Passed sponsoring body
       = Passed House (if House sponsored)
       = Passed Senate (if Senate sponsored)
  3. Enroll = Going to Governor or President
  4. Pass = Became a Law
  5. Vetoed = Vetoed
  9. Refer = To Committee
  */
};

export interface LegiscanMasterListResult {
  status: string;
  masterlist: Masterlist;
}

export type Masterlist = SessionMetaData & LegiscanMasterBillObject;

export type SessionMetaData = {
  session?: MasterListSession;
};

export type LegiscanMasterBillObject = {
  [number: string]: LegiscanMasterListBill;
};

export interface MasterListSession {
  session_id: number;
  state_id: number;
  year_start: number;
  year_end: number;
  prefile: number;
  sine_die: number;
  prior: number;
  special: number;
  session_tag: string;
  session_title: string;
  session_name: string;
}

export interface LegiscanMasterListBill {
  bill_id: number;
  number: string;
  change_hash: string;
  url: string;
  status_date: string;
  status: number;
  last_action_date: string;
  last_action: string;
  title: string;
  description: string;
}

export interface GetBillByIdResponse {
  status: string;
  bill: LegiscanBillById;
}

export interface LegiscanBillById {
  bill_id: number;
  change_hash: string;
  session_id: number;
  session: {
    session_id: number;
    state_id: number;
    year_start: number;
    year_end: number;
    prefile: number;
    sine_die: number;
    prior: number;
    special: number;
    session_tag: string;
    session_title: string;
    session_name: string;
  };
  url: string;
  state_link: string;
  completed: number;
  status: number;
  status_date: string;
  progress: {
    date: string;
    event: number;
  }[];
  state: string;
  state_id: number;
  bill_number: string;
  bill_type: string;
  bill_type_id: string;
  body: string;
  body_id: number;
  current_body: string;
  current_body_id: number;
  title: string;
  description: string;
  pending_committee_id: number;
  committee: unknown[];
  referrals: {
    date: string;
    committee_id: number;
    chamber: string;
    chamber_id: number;
    name: string;
  }[];
  history: {
    date: string;
    action: string;
    chamber: string;
    chamber_id: number;
    importance: number;
  }[];
  sponsors: {
    people_id: number;
    person_hash: string;
    party_id: string;
    state_id: number;
    party: string;
    role_id: number;
    role: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    nickname: string;
    district: string;
    ftm_eid: number;
    votesmart_id: number;
    opensecrets_id: string;
    knowwho_pid: number;
    ballotpedia: string;
    bioguide_id: string;
    sponsor_type_id: number;
    sponsor_order: number;
    committee_sponsor: number;
    committee_id: number;
    state_federal: number;
  }[];
  sasts: {
    type_id: number;
    type: string;
    sast_bill_number: string;
    sast_bill_id: number;
  }[];
  subjects: {
    subject_id: number;
    subject_name: string;
  }[];
  texts: {
    doc_id: number;
    date: string;
    type: string;
    type_id: number;
    mime: string;
    mime_id: number;
    url: string;
    state_link: string;
    text_size: number;
    text_hash: string;
  }[];
  votes: unknown[];
  amendments: unknown[];
  supplements: unknown[];
  calendar: unknown[];
}

type Session = {
  session_id: number;
  state_id: number;
  year_start: number;
  year_end: number;
  prefile: number;
  sine_die: number;
  prior: number;
  special: number;
  session_tag: string;
  session_title: string;
  session_name: string;
  dataset_hash: string;
  session_hash: string;
  name: string;
};

export type GetSessionResult = {
  status: string;
  sessions: Session[];
};
