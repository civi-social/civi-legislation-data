import axios from "axios";
import { LEGISCAN_API_KEY } from "../config";
import {
  GetBillByIdResponse,
  LegiscanBillById,
  LegiscanMasterListBill,
  LegiscanMasterListResult,
} from "./legiscan.types";

const getMasterList = async (
  sessionId: string
): Promise<LegiscanMasterListBill[]> => {
  console.log("Get Master List", sessionId);
  try {
    const results = await axios.get<LegiscanMasterListResult>(
      `https://api.legiscan.com/?op=getMasterList&id=${sessionId}&key=${LEGISCAN_API_KEY}`
    );

    // all results are a numbered string, except the "session" key
    delete results.data.masterlist.session;
    const bills = Object.values(
      results.data.masterlist
    ) as LegiscanMasterListBill[];

    return bills;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getBillDetailsFromMasterList = async (
  masterList: LegiscanMasterListBill[]
) => {
  console.log("Get Bill Details From MasterList");
  try {
    const results = await Promise.all(
      masterList.map((bill) => legiscan.getBillById(String(bill.bill_id)))
    );
    return results;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getBillById = async (id: string): Promise<LegiscanBillById> => {
  console.log("Get Bill By ID:", id);
  try {
    const results = await axios.get<GetBillByIdResponse>(
      `https://api.legiscan.com/?op=getBill&id=${id}&key=${LEGISCAN_API_KEY}`
    );
    return results.data.bill;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const legiscan = {
  getMasterList,
  getBillById,
  getBillDetailsFromMasterList,
};
