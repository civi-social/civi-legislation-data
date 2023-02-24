import axios from "axios";
import { CiviLegislationData } from "./types";

export const civiLegislationApi = {
  getLegislationData: async (
    locale: "chicago" | "illinois" | "usa"
  ): Promise<CiviLegislationData[]> => {
    const result = await axios.get<CiviLegislationData[]>(
      `https://github.com/civi-social/civi-legislation-data/releases/download/nightly/${locale}.legislation.json`
    );
    return result.data;
  },
};
