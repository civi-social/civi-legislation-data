import { isLocale } from "../api/utils";

export const getShouldSkipCache = () => {
  const skipCache =
    process.env.SKIP_CACHE === "true" || process.env.SKIP_CACHE === "1";

  if (skipCache) {
    console.info("skipping cached data.");
  }
  return skipCache;
};

export const getLegiscanAPIKey = () => {
  if (!process.env.LEGISCAN_API_KEY) {
    console.error("Need to provide LEGISCAN_API_KEY as environment var");
    process.exit(1);
  }
  return process.env.LEGISCAN_API_KEY;
};

export const getLocale = () => {
  const locale = process.env.LOCALE;
  if (!locale) {
    return undefined;
  }
  if (!isLocale(locale)) {
    console.error("Invalid locale provided");
    process.exit(1);
  } else {
    return locale;
  }
};
