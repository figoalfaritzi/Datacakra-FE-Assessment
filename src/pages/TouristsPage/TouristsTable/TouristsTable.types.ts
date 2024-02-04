import {
  IGetTouristsResponse,
  ITouristResponse,
} from "@/services/touristService/touristService.types";
import { ColumnDef } from "@tanstack/react-table";

interface ITouristsTable {
  columns: ColumnDef<ITouristResponse>[];
  data: IGetTouristsResponse;
  pageIndex: number;
  handleFetchNextPage: () => void;
  handleFetchPreviousPage: () => void;
}

export default ITouristsTable;
