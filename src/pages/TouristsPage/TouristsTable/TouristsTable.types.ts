import {
  IGetTouristsResponse,
  IGetTouristsResponseData,
} from "@/services/touristService/touristService.types";
import { ColumnDef } from "@tanstack/react-table";

interface ITouristsTable {
  columns: ColumnDef<IGetTouristsResponseData>[];
  data: IGetTouristsResponse;
  pageIndex: number;
  handleFetchNextPage: () => void;
  handleFetchPreviousPage: () => void;
}

export default ITouristsTable;
