import axios from "axios";

export const civiLegislationApi = {
  getLegislationData: async (locale: "chicago" | "illinois" | "usa") => {
    return axios.get(
      `https://github.com/civi-social/civi-legislation-data/releases/download/nightly/${locale}.legislation.json`
    );
  },
};
