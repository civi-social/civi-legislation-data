import type { CiviLegislationData } from "../api/types";
import { councilmatic } from "./api/councilmatic";
import * as il from "./localities/illinois.legiscan";
import * as usa from "./localities/usa.legiscan";
import { writeJSON } from "../fs/write-file";

const scrapeLegislation = async () => {
  const skipCache =
    process.env.SKIP_LEGISLATION_CACHE === "true" ||
    process.env.SKIP_LEGISLATION_CACHE === "1";

  if (skipCache) {
    console.info("skipping cached data.");
  }

  let legislation: CiviLegislationData[] = [];
  legislation = await councilmatic.getChicagoBills();
  writeJSON("chicago.legislation", legislation);
  legislation = await il.getBills({ skipCache });
  writeJSON("illinois.legislation", legislation);
  legislation = await usa.getBills({ skipCache });
  writeJSON("usa.legislation", legislation);
};

scrapeLegislation();
