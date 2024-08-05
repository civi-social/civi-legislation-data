import type { CiviLegislationData } from "../api/types";
import { councilmatic } from "./api/councilmatic";
import { writeLegislationJSON } from "../fs/write-file";

const scrapeLegislation = async () => {
  const skipCache =
    process.env.SKIP_LEGISLATION_CACHE === "true" ||
    process.env.SKIP_LEGISLATION_CACHE === "1";

  if (skipCache) {
    console.info("skipping cached data.");
  }

  let legislation: CiviLegislationData[] = [];
  legislation = await councilmatic.getChicagoBills();
  writeLegislationJSON("chicago", legislation);
};

scrapeLegislation();
