import { Twitter } from "./";

type ServiceEntry = {
  identifier: string;
};

export type Photo = {
  highresLink: string;
  photoLink: string;
  thumbLink: string;
};

export type Person = {
  id?: number;
  name: string;
  bio: string;
  status?: string;
  country?: string;
  city?: string;
  photo?: Photo;
  localizedCountryName?: string;
  twitter?: Twitter;
  facebook?: ServiceEntry;
};

export type PersonInput = {
  input: {
    name: string;
    bio: string;
    photoUrl?: string;
  };
};

export type PersonSearchArgs = {
  name: string;
};

export type PersonBioArgs = {
  size: number;
};
