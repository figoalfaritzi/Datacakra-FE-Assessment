import { axiosMainClient } from "../api";
import { IGetTouristsResponse, PageType } from "./touristService.types";

const url = "/Tourist";

export const getTourists = async (
  page: PageType,
): Promise<IGetTouristsResponse> => {
  const { data } = await axiosMainClient({
    url,
    method: "GET",
    params: {
      page,
    },
  });

  return data;
};
