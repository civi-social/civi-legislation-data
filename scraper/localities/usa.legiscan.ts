import { CiviLegislationData } from "../../api/types";
import { getCiviLegislationBills } from "../api/legiscan";
import { filterMasterList, legiscanToCivi } from "./usa.selector";

export const getBills = async ({
  skipCache,
}: {
  skipCache: boolean;
}): Promise<CiviLegislationData[]> => {
  return getCiviLegislationBills({
    skipCache,
    locale: "usa",
    filterMasterList,
    legiscanToCivi,
  });
};
