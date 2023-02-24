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
}
