export type Country = {
  name: string;
  value: string | number;
  code?: string;
  phone_code: string;
  emoji: string;
};

export type RegisterData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: Date | undefined;
  phone_code: string;
  phone_no: string;
  address: {
    country_id: string | number;
    state_id: string | number;
    city_id: string | number;
    postal_code: string;
    street_line_one: string;
  };
};

export type userData = {
  address: {
    country_id: string | number;
    state_id: string | number;
    city_id: string | number;
    postal_code: string;
    street_line_one: string;
    user_id: string;
  };
  dob: string;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  password: string;
};
