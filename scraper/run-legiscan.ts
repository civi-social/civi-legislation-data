import type { CiviLegislationData } from "../api/types";
import * as il from "./localities/illinois.legiscan";
import * as usa from "./localities/usa.legiscan";
import { writeLegislationJSON } from "../fs/write-file";

const scrapeLegislation = async () => {
  const skipCache =
    process.env.SKIP_LEGISLATION_CACHE === "true" ||
    process.env.SKIP_LEGISLATION_CACHE === "1";

  if (skipCache) {
    console.info("skipping cached data.");
  }

  let legislation: CiviLegislationData[] = [];
  legislation = await il.getBills({ skipCache });
  writeLegislationJSON("illinois", legislation);
  legislation = await usa.getBills({ skipCache });
  writeLegislationJSON("usa", legislation);
};

scrapeLegislation();
