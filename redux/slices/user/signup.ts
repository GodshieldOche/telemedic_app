import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterData } from "../../../utils/interface";
import { saveSecure } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface signupState {
  loading: boolean;
  resending: boolean;
  email: string;
  data: RegisterData;
  error: object | null;
}

export const postSignUp: any = createAsyncThunk(
  `signup/postSignUp`,
  async (body: RegisterData, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/auth/register`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.data.email;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postResendOTP: any = createAsyncThunk(
  `signup/postResendOTP`,
  async (body: { email: string }, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/auth/resend-otp`,
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

export const postVerfifyAccount: any = createAsyncThunk(
  `signup/postVerfifyAccount`,
  async (
    body: { email: string; otp: string },
    { rejectWithValue, dispatch }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/auth/verify`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("userToken", token);
      dispatch(resetRegisterData());
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: signupState = {
  loading: true,
  resending: false,
  data: {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: undefined,
    phone_code: "",
    phone_no: "",
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

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetRegisterData: (state) => {
      return (state = initialState);
    },
    setUserRegisterData: (
      state: signupState,
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
    builder.addCase(postSignUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload;
      }),
      builder.addCase(postSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(postResendOTP.pending, (state) => {
      state.resending = true;
    }),
      builder.addCase(postResendOTP.fulfilled, (state, { payload }) => {
        state.resending = false;
        state.email = payload;
      }),
      builder.addCase(postResendOTP.rejected, (state, { payload }) => {
        state.resending = false;
        state.error = payload;
      });
    builder.addCase(postVerfifyAccount.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postVerfifyAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
      }),
      builder.addCase(postVerfifyAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetRegisterData, setUserRegisterData } = signupSlice.actions;

export default signupSlice.reducer;
