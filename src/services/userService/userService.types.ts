export type IdType = string;
type EmailType = string;
type NameType = string;
type CodeType = number;
type MessageType = "success";

export interface IPostLoginResponse {
  $id: string;
  code: CodeType;
  message: MessageType;
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

export interface IPostRegisterRequest {
  name: NameType;
  email: EmailType;
  password: string;
}

export interface IPostRegisterResponseData {
  id: string;
  email: EmailType;
  name: NameType;
}

export interface IPostRegisterResponse {
  $id: number;
  code: CodeType;
  message: MessageType;
  data: IPostRegisterResponseData;
}
