export type PageType = string;
export type TouristEmailType = string;
export type TouristProfilePictureType = string;
export type TouristLocationType = string;
export type TouristNameType = string;

export interface IGetTouristsResponse {
  page: PageType;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: ITouristResponse[];
}

export interface ITouristResponse {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: TouristEmailType;
  tourist_profilepicture: TouristProfilePictureType;
  tourist_location: TouristLocationType;
  tourist_name: TouristNameType;
}

export interface IPostTouristRequest {
  tourist_email: TouristEmailType;
  tourist_location: TouristLocationType;
  tourist_name: TouristNameType;
}
export interface IPutTouristRequest extends IPostTouristRequest {
  id: string;
}
