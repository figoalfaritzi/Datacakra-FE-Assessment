import { axiosMainClient } from "../api";
import { IdType } from "../userService";
import {
  ITouristResponse,
  IGetTouristsResponse,
  PageType,
} from "./touristService.types";

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

export const getTourist = async (id: IdType): Promise<ITouristResponse> => {
  const { data } = await axiosMainClient({
    url: `${url}/${id}`,
    method: "GET",
  });

  return data;
};

export const deleteTourist = async (id: IdType): Promise<ITouristResponse> => {
  const { data } = await axiosMainClient({
    url: `${url}/${id}`,
    method: "DELETE",
  });

  return data;
};
