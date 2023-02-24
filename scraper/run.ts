import type { CiviLegislationData } from "../api/types";
import { councilmatic } from "./api/councilmatic";
import * as il from "./localities/illinois.legiscan";
import * as usa from "./localities/usa.legiscan";
import { writeJSON } from "./writeFile";

const scrapeLegislation = async () => {
  let legislation: CiviLegislationData[] = [];
  legislation = await councilmatic.getChicagoBills();
  writeJSON("chicago.legislation", legislation);
  legislation = await il.getBills();
  writeJSON("illinois.legislation", legislation);
  legislation = await usa.getBills();
  writeJSON("usa.legislation", legislation);
};

scrapeLegislation();
