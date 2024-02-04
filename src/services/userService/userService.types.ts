export type IdType = string;
type EmailType = string;
type NameType = string;

export interface IPostLoginResponse {
  $id: string;
  code: number;
  message: "success";
  data: IPostLoginResponseData;
}

export interface IPostLoginResponseData {
  $id: string;
  Id: IdType;
  Name: NameType;
  Email: EmailType;
  Token: string;
}

export interface IGetUserInfoResponse {
  id: IdType;
  email: EmailType;
  password: string;
  name: NameType;
  avatar: string;
}
