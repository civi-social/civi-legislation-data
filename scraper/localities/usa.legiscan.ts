import { CiviLegislationData } from "../../api/types";
import { getCiviLegislationBills } from "../api/legiscan";
import { filterMasterList, legiscanToCivi } from "./usa.selector";

export const getBills = async (): Promise<CiviLegislationData[]> => {
  return getCiviLegislationBills({
    locale: "usa",
    filterMasterList,
    legiscanToCivi,
  });
};
