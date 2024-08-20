import { CiviLegislationData, Locales } from "../api";
import { councilmatic } from "../scraper/sources/councilmatic";
import * as il from "../scraper/localities/illinois.legiscan";
import * as usa from "../scraper/localities/usa.legiscan";

export const api: Record<
  Locales,
  (p: { skipCache: boolean }) => Promise<CiviLegislationData[]>
> = {
  chicago: councilmatic.getChicagoBills,
  illinois: il.getBills,
  usa: usa.getBills,
};
