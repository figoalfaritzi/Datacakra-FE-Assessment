import { BASE_URL } from "@/config";
import axios, { InternalAxiosRequestConfig } from "axios";
import { IPostLoginResponseData } from "./userService";

export const axiosAuthClient = axios.create({
  baseURL: `${BASE_URL}/api/authaccount`,
});

export const axiosMainClient = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const processRequest = async (config: InternalAxiosRequestConfig) => {
  const { Token }: IPostLoginResponseData = JSON.parse(
    window.localStorage.getItem("USER") || "",
  );

  let configObj: any = {};

  if (Token) {
    // eslint-disable-next-line no-param-reassign
    configObj = {
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${Token}`,
      },
    };
  }

  return configObj;
};

axiosMainClient.interceptors.request.use(processRequest, (error) =>
  Promise.reject(error),
);
