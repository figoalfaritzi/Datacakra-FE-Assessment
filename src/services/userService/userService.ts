import { ILogin } from "@/authentication/authentication.types";
import { axiosAuthClient, axiosMainClient } from "../api";
import { IGetUserInfoResponse, IPostLoginResponse, IdType } from ".";

export const postLogin = async (
  loginData: ILogin,
): Promise<IPostLoginResponse> => {
  const { data } = await axiosAuthClient({
    url: `/login`,
    method: "POST",
    data: loginData,
  });

  return data;
};

export const getUserInfo = async (
  id: IdType,
): Promise<IGetUserInfoResponse> => {
  const { data } = await axiosMainClient({
    url: `/users/${id}`,
    method: "GET",
  });

  return data;
};
