export interface CiviLegislationData {
  status: string;
  statusDate: string;
  id: string;
  title: string;
  link: string;
  source_id: string;
  sponsors: { name: string; role: string; district: string }[];
  description?: string;
  tags?: string[];
  summaries?: {
    gpt: string;
  };
}

export interface CiviGptLegislationData {
  [bill_id: string]: {
    gpt_summary?: string;
    gpt_tags?: string[];
    // retrieved from a google sheet for specific bills where
    // humans feel the gpt summary wasn't sufficient
    wiki_summary?: string;
    wiki_tags?: string[];
  };
}

export const locales = ["chicago", "illinois", "usa"] as const;

export type Locales = (typeof locales)[number];
