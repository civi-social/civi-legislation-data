import type {
  LegiscanBillById,
  LegiscanMasterListBill,
} from "../api/legiscan.types";
import { STATUS_MAP } from "../api/legiscan.types";
import type { CiviLegislationData } from "../../types";

export const filterMasterList = (bills: LegiscanMasterListBill[]) => {
  return (
    bills
      // only show bills that are passed introduction stage
      .filter((bill) => bill.status > 1)
  );
};

export const billByIdToCiviLegislation = (
  bill: LegiscanBillById
): CiviLegislationData => {
  return {
    id: bill.bill_number,
    title: bill.title,
    description: bill.description,
    status: STATUS_MAP[bill.status] || "",
    statusDate: bill.status_date,
    sponsors: bill.sponsors.map((sponsor) => ({
      name: sponsor.name,
      role: sponsor.role,
      district: sponsor.district,
    })),
    link: bill.state_link,
    source_id: String(bill.bill_id),
  };
};
