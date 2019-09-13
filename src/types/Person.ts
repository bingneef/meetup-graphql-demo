import { Twitter } from "./";

type ServiceEntry = {
  identifier: string;
};

export type Photo = {
  highres_link: string;
  photo_link: string;
  thumb_link: string;
};

export type Person = {
  name: string;
  bio: string;
  status: string;
  country: string;
  city: string;
  photo: Photo;
  localizedCountryName: string;
  twitter: Twitter;
  facebook: ServiceEntry;
};

export type PersonSearchArgs = {
  name: string;
};

export type PersonBioArgs = {
  size: number;
};
