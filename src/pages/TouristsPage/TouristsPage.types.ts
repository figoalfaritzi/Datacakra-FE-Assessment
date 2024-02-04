import {
  TouristEmailType,
  TouristLocationType,
  TouristNameType,
  TouristProfilePictureType,
} from "@/services/touristService/touristService.types";

export type Tourist = {
  profilePicture: TouristProfilePictureType;
  name: TouristNameType;
  location: TouristLocationType;
  email: TouristEmailType;
};
