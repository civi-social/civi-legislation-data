// script to get current release data for any reason

import axios from "axios";
import { civiLegislationApi, CiviLegislationData, Locales } from "../api";
import { writeJSON } from "./writeFile";

export const retrieveCurrentRelease = (
  cb: (locale: Locales, s: CiviLegislationData[]) => void
) => {
  civiLegislationApi.locales.forEach(async (locale) => {
    const url = civiLegislationApi.getLegislationDataUrl(locale);
    console.log(url);
    const res = await axios.get<CiviLegislationData[]>(url);
    cb(locale, res.data);
  });
};

retrieveCurrentRelease((locale, legislation) => {
  writeJSON(`${locale}.legislation`, legislation);
});
