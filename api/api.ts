export const civiLegislationApi = {
  getLegislationDataUrl: (locale: "chicago" | "illinois" | "usa"): string => {
    return `https://github.com/civi-social/civi-legislation-data/releases/download/nightly/${locale}.legislation.json`;
  },
};
