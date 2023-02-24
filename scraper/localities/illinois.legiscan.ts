import { CiviLegislationData } from "../../types";
import { legiscan } from "../api/legiscan";
import * as il from "./illinois.selector";

export const getBills = async (): Promise<CiviLegislationData[]> => {
  console.log("Get Illinois Bills");
  try {
    // todo: get from api
    // https://api.legiscan.com/?op=getSessionList&state=US
    const sessionId = "2020";

    // Get Master List
    const bills = await legiscan.getMasterList(sessionId);
    const masterListFiltered = il.filterMasterList(bills);
    // Get Bill Details
    const billDetails = await legiscan.getBillDetailsFromMasterList(
      masterListFiltered
    );
    const civiLegislationData = billDetails.map(il.billByIdToCiviLegislation);

    return civiLegislationData;
  } catch (e) {
    return Promise.reject(e);
  }
};
