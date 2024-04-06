// Typing the .legislation.json files
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

// Type for the .gpt.json files
export interface CiviGptLegislationData {
  [bill_id: string]: {
    gpt_summary?: string;
    gpt_tags?: string[];
  };
}

// Typing the wiki.json files
export interface CiviWikiLegislationData {
  bill_id: string;
  summary: string;
  locale: string;
  date: string;
  tags: string[];
}

export const locales = ["chicago", "illinois", "usa"] as const;

export type Locales = (typeof locales)[number];
