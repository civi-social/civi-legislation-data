import { CiviLegislationData } from "../../api/types";
import { getCiviLegislationBills } from "../api/legiscan";
import { filterMasterList, legiscanToCivi } from "./illinois.selector";

export const getBills = async (): Promise<CiviLegislationData[]> => {
  return getCiviLegislationBills({
    locale: "illinois",
    filterMasterList,
    legiscanToCivi,
  });
};
