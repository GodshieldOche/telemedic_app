import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FacilityRegisterData, RegisterData } from "../../../utils/interface";
import { saveSecure } from "../../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facility_signupState {
  loading: boolean;
  resending: boolean;
  email: string;
  data: FacilityRegisterData;
  error: object | null;
}

export const postFacilitySignUp: any = createAsyncThunk(
  `facility_signup/postFacilitySignUp`,
  async (body: RegisterData, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/auth/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await AsyncStorage.setItem("facilityToken", token);
      return data.data.data.email;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postFacilityResendOTP: any = createAsyncThunk(
  `facility_signup/postFacilityResendOTP`,
  async (body: { email: string }, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/auth/resend-otp`,
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

export const postFacilityRequestOTP: any = createAsyncThunk(
  `facility_signup/postFacilityRequestOTP`,
  async (body: { email: string }, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/auth/request-otp`,
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

export const postFacilityVerfifyAccount: any = createAsyncThunk(
  `facility_signup/postFacilityVerfifyAccount`,
  async (
    body: { email: string; otp: string },
    { rejectWithValue, dispatch }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/auth/verify`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("facilityToken", token);
      dispatch(resetFacilityRegisterData());
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: facility_signupState = {
  loading: true,
  resending: false,
  data: {
    email: "",
    name: "",
    description: "",
    facility_category_id: "",
    facility_type_id: "",
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

export const facility_signupSlice = createSlice({
  name: "facility_signup",
  initialState,
  reducers: {
    resetFacilityRegisterData: (state) => {
      return (state = initialState);
    },
    setFacilityRegisterData: (
      state: facility_signupState,
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
  },
  extraReducers: (builder) => {
    builder.addCase(postFacilitySignUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postFacilitySignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload;
      }),
      builder.addCase(postFacilitySignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(postFacilityResendOTP.pending, (state) => {
      state.resending = true;
    }),
      builder.addCase(postFacilityResendOTP.fulfilled, (state, { payload }) => {
        state.resending = false;
        state.email = payload;
      }),
      builder.addCase(postFacilityResendOTP.rejected, (state, { payload }) => {
        state.resending = false;
        state.error = payload;
      });
    builder.addCase(postFacilityRequestOTP.pending, (state) => {
      state.resending = true;
    }),
      builder.addCase(
        postFacilityRequestOTP.fulfilled,
        (state, { payload }) => {
          state.resending = false;
          state.email = payload;
        }
      ),
      builder.addCase(postFacilityRequestOTP.rejected, (state, { payload }) => {
        state.resending = false;
        state.error = payload;
      });
    builder.addCase(postFacilityVerfifyAccount.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postFacilityVerfifyAccount.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postFacilityVerfifyAccount.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetFacilityRegisterData, setFacilityRegisterData } =
  facility_signupSlice.actions;

export default facility_signupSlice.reducer;
