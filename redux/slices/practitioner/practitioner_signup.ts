import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  PractitionerRegisterData,
  RegisterData,
} from "../../../utils/interface";
import { saveSecure } from "../../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitioner_signupState {
  loading: boolean;
  resending: boolean;
  files: {
    banner_image: File | undefined | any;
    driving_licence: File | undefined | any;
    international_passport: File | undefined | any;
    kyc_image: File | undefined | any;
  };
  email: string;
  data: PractitionerRegisterData;
  error: object | null;
}

export const postPractitionerSignUp: any = createAsyncThunk(
  `practitioner_signup/postPractitionerSignUp`,
  async (body: RegisterData, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/auth/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await AsyncStorage.setItem("practitionerToken", token);
      return data.data.data.email;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPractitionerResendOTP: any = createAsyncThunk(
  `practitioner_signup/postPractitionerResendOTP`,
  async (body: { email: string }, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/auth/resend-otp`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPractitionerRequestOTP: any = createAsyncThunk(
  `practitioner_signup/postPractitionerRequestOTP`,
  async (body: { email: string }, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/auth/request-otp`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPractitionerVerfifyAccount: any = createAsyncThunk(
  `practitioner_signup/postPractitionerVerfifyAccount`,
  async (
    body: { email: string; otp: string },
    { rejectWithValue, dispatch }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/auth/verify`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("practitionerToken", token);
      dispatch(resetPractitionerRegisterData());
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: practitioner_signupState = {
  loading: true,
  resending: false,
  files: {
    kyc_image: undefined,
    driving_licence: undefined,
    international_passport: undefined,
    banner_image: undefined,
  },
  data: {
    email: "",
    first_name: "",
    last_name: "",
    description: "",
    practitioner_category_id: "",
    practitioner_practice_id: "",
    password: "",
    phone_code: "",
    phone_no: "",
    services: [],
    address: {
      country_id: "",
      state_id: "",
      city_id: "",
      postal_code: "",
      street_line_one: "",
    },
  },
  email: "",
  error: null,
};

export const practitioner_signupSlice = createSlice({
  name: "practitioner_signup",
  initialState,
  reducers: {
    resetPractitionerRegisterData: (state) => {
      return (state = initialState);
    },
    setPractitionerRegisterData: (
      state: practitioner_signupState,
      action: PayloadAction<{ data: any }>
    ) => {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
      };
    },
    setPractitionerFiles: (
      state: practitioner_signupState,
      action: PayloadAction<{ data: any }>
    ) => {
      return {
        ...state,
        files: {
          ...state.files,
          ...action.payload.data,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postPractitionerSignUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postPractitionerSignUp.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.email = payload;
        }
      ),
      builder.addCase(postPractitionerSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(postPractitionerResendOTP.pending, (state) => {
      state.resending = true;
    }),
      builder.addCase(
        postPractitionerResendOTP.fulfilled,
        (state, { payload }) => {
          state.resending = false;
          state.email = payload;
        }
      ),
      builder.addCase(
        postPractitionerResendOTP.rejected,
        (state, { payload }) => {
          state.resending = false;
          state.error = payload;
        }
      );
    builder.addCase(postPractitionerRequestOTP.pending, (state) => {
      state.resending = true;
    }),
      builder.addCase(
        postPractitionerRequestOTP.fulfilled,
        (state, { payload }) => {
          state.resending = false;
          state.email = payload;
        }
      ),
      builder.addCase(
        postPractitionerRequestOTP.rejected,
        (state, { payload }) => {
          state.resending = false;
          state.error = payload;
        }
      );
    builder.addCase(postPractitionerVerfifyAccount.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postPractitionerVerfifyAccount.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postPractitionerVerfifyAccount.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetPractitionerRegisterData,
  setPractitionerFiles,
  setPractitionerRegisterData,
} = practitioner_signupSlice.actions;

export default practitioner_signupSlice.reducer;
