import { ImagePickerAsset } from "expo-image-picker";

export type Country = {
  name: string;
  value: string | number;
  code?: string;
  phone_code: string;
  emoji: string;
};

export type Address = {
  country_id: string | number;
  state_id: string | number;
  city_id: string | number;
  postal_code: string;
  street_line_one: string;
};

export type RegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: Date | undefined | any;
  phone_code: string;
  phone_no: string;
  address: Address;
};

export type Categorish = {
  id: string;
  name: string;
  description: string;
};

export type FacilityRegisterData = {
  email: string;
  password: string;
  name: string;
  description: string;
  facility_category_id: string;
  facility_type_id: string;
  phone_code: string;
  phone_no: string;
  services: string[];
  address: Address;
};

export type PractitionerRegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  description: string;
  practitioner_category_id: string;
  practitioner_practice_id: string;
  phone_code: string;
  phone_no: string;
  nin?: string;
  services: string[];
  address: Address;
};

export type Licence = {
  name: string;
  description: string;
  from: Date | undefined | any;
  to: Date | undefined | any;
  licence_doc: File | undefined | any;
};

export type Experience = {
  title: string;
  organisation: string;
  description: string;
  country_id: string | number;
  present: boolean;
  from: Date | undefined | any;
  to: Date | undefined | any;
};

export type Education = {
  institution: string;
  degree_id: string;
  field_of_study: string;
  country_id: string | number;
  from: Date | undefined | any;
  to: Date | undefined | any;
  present: boolean;
};

export type Certification = {
  name: string;
  description: string;
  date: Date | undefined | any;
  certificate_doc: File | undefined | any;
};

export type Gallery = {
  images: ImagePickerAsset[];
  videos: ImagePickerAsset[];
};

export type FaceDetectionChecks = {
  isFace: boolean;
  isStraight: boolean;
  isSmiling: boolean;
  isEyeShut: boolean;
};
