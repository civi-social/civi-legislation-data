import { CiviLegislationData } from "../../api/types";
import { legiscan } from "../api/legiscan";
import * as usa from "./usa.selector";

export const getBills = async (): Promise<CiviLegislationData[]> => {
  console.log("Get National Bills");
  try {
    // todo: get from api
    // https://api.legiscan.com/?op=getSessionList&state=US
    const sessionId = "2041";

    // Get Master List
    const bills = await legiscan.getMasterList(sessionId);
    const masterListFiltered = usa.filterMasterList(bills);

    // Get Bill Details
    const billDetails = await legiscan.getBillDetailsFromMasterList(
      masterListFiltered
    );
    const civiLegislationData = billDetails.map(usa.billByIdToCiviLegislation);

    return civiLegislationData;
  } catch (e) {
    return Promise.reject(e);
  }
};
