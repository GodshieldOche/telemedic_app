import { ImagePickerAsset } from "expo-image-picker";
import { LinkProps } from "expo-router";
import { StyleProp, ViewStyle } from "react-native";

export type Modal = {
  active: boolean;
  type: "DeleteUser" | "LogOutUser" | "Error" | "Success";
};

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
  first_name?: string;
  last_name?: string;
  phone_code?: string;
  phone_no?: string;
  is_default?: boolean;
};

export type AddressWithID = {
  id: string;
  country: {
    name: string;
  };
  state: {
    name: string;
  };
  city: {
    name: string;
  };
  postal_code: string;
  street_line_one: string;
  is_default: boolean;
  first_name?: string;
  last_name?: string;
  phone_code?: string;
  phone_no?: string;
  country_id: string | number;
  state_id: string | number;
  city_id: string | number;
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

export type Language = {
  id: string;
  name: string;
  code: string;
  native: string;
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
  hourly_rate: number;
  phone_code: string;
  phone_no: string;
  nin?: string;
  services: string[];
  address: Address;
  languages: Language[];
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

export type BannerProfile = {
  banner_image: ImagePickerAsset;
  profile_image: ImagePickerAsset;
};

export type FaceDetectionChecks = {
  isFace: boolean;
  isStraight: boolean;
  isSmiling: boolean;
  isEyeShut: boolean;
};

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: Date | undefined | any;
  phone_code: string;
  phone_no: string;
  display_photo: string;
  blur_hash?: string;
}

export interface Resource {
  id: string;
  name: string;
  tag: string;
  rating: number;
  hourly_rate: number;
  type: "practitioner" | "facility";
  display_picture: string;
  address: AddressWithID;
  blur_hash?: string;
}

export interface Service {
  text: string;
  icon: React.JSX.Element;
  route: LinkProps<string>["href"];
  iconContainerStyles?: StyleProp<ViewStyle>;
  params?: any;
  action?: () => void;
  isLink?: boolean;
}

export interface Media {
  id: string;
  type: string;
  url: string;
  content_type: string;
  size: number;
  blur_hash?: string;
}

export interface Practitioner {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  phone_code: string;
  phone_no: string;
  practice: string;
  rating: number;
  services: string[];
  address: AddressWithID;
  banner_image: string;
  profile_image: string;
  hourly_rate: number;
  banner_blur_hash?: string;
  blur_hash?: string;
  certification: {
    date: string;
    description: string;
    id: string;
    name: string;
  };
  education: {
    degree: string;
    field_of_study: string;
    from: string;
    id: string;
    institution: string;
    present: boolean;
    to: string;
  };
  experience: {
    id: string;
    title: string;
    organisation: string;
    description: string;
    present: boolean;
    from: string;
    to: string;
  };
  licence: {
    description: string;
    from: string;
    id: string;
    name: string;
    to: string;
  };
  languages: Language[];
  videos: Media[];
  images: Media[];
}

export interface Facility {
  id: string;
  name: string;
  email: string;
  description: string;
  phone_code: string;
  phone_no: string;
  type: string;
  services: string[];
  address: AddressWithID;
  certification: {
    date: string;
    description: string;
    id: string;
    name: string;
  };
  education: {
    degree: string;
    field_of_study: string;
    from: string;
    id: string;
    institution: string;
    present: boolean;
    to: string;
  };
  experience: {
    id: string;
    title: string;
    organisation: string;
    description: string;
    present: boolean;
    from: string;
    to: string;
  };
  licence: {
    description: string;
    from: string;
    id: string;
    name: string;
    to: string;
  };
  media: Media[];
}

export interface AllOnWallet {
  wallet: {
    id: string;
    main_balance: number;
    locked_balance: number;
    currency: string;
    symbol: string;
  };
  accounts: {
    id: string;
    account_number: string;
    bank_name: string;
    account_name: string;
  }[];
  transactions: {
    id: string;
    title: string;
    name: string;
    type: "inflow" | "outflow";
    method: string;
    date_initialized: string;
    date_completed: string;
    amount: number;
    status: string;
    currency: string;
    symbol: string;
  }[];
}

export interface MedicalHistory {
  id?: string;
  condition: string;
  present: boolean;
  from: Date | undefined | any;
  to: Date | undefined | any;
}

export interface Allergy {
  id?: string;
  agent: string;
  reactions: string[];
}

export interface Insurance {
  id?: string;
  name: string;
  number: string;
  from: Date | undefined | any;
  to: Date | undefined | any;
  insurance_doc?: File | undefined | any;
}

export interface TestResult {
  id?: string;
  healthCenter: string;
  test: string;
  date: Date | undefined | any;
  result_file?: File | undefined | any;
}

export interface Prescription {
  id?: string;
  name: string;
  medication_id: string;
  description: string;
  start_date: Date | undefined | any;
  end_date: Date | undefined | any;
  time_segments: {
    part_of_day: string;
    quantity: number;
    time: Date | undefined | any;
  }[];
  created_by: string;
  medication_image?: File | undefined | any;
  media?: Media;
  medication?: Categorish;
}

export interface Pagination {
  total: number;
  items_per_page: number;
  page: number;
}

export interface Transaction {
  id: string;
  title: string;
  name: string;
  type: "Credit" | "Debit";
  transaction_reference: string;
  date: string;
  transaction_type: string;
  amount: number;
  status: string;
  currency: string;
  symbol: string;
  session_id: string;
  recipient: string | null;
  sender: string | null;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  display_image: string;
  blur_hash?: string;
}

export interface Relationship extends Contact {
  relationship: string;
  is_approved: string;
  can_view_ehr: boolean;
}
