// script to get current release data for any reason

import { civiLegislationApi } from "../api";
import { writeGptJSON, writeLegislationJSON } from "../fs/write-file";
import { getCachedGpt, getCachedLegislation } from "./get";

export const retrieveCurrentRelease = async () => {
  try {
    civiLegislationApi.locales.forEach(async (locale) => {
      const legislation = await getCachedLegislation(locale);
      const gpt = await getCachedGpt(locale);
      writeLegislationJSON(locale, legislation);
      writeGptJSON(locale, gpt);
    });
  } catch (e) {
    console.error("Error retrieving current release data");
    console.error(e);
    process.exit(1);
  }
};

retrieveCurrentRelease();
