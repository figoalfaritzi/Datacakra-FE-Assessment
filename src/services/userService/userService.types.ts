export type IdType = string;

export interface IPostLoginResponse {
  $id: string;
  code: number;
  message: "success";
  data: IPostLoginResponseData;
}

export interface IPostLoginResponseData {
  $id: string;
  Id: IdType;
  Name: string;
  Email: string;
  Token: string;
}
