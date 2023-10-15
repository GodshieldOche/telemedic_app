import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { saveSecure } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facilitySigninState {
  loading: boolean;
  data: object;
  error: object | null;
}

export const postFacilitySignIn: any = createAsyncThunk(
  `facility_signin/postFacilitySignIn`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/auth/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("facilityToken", token);
      return data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: facilitySigninState = {
  loading: true,
  data: {},
  error: null,
};

export const facility_signinSlice = createSlice({
  name: "facility_signin",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postFacilitySignIn.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postFacilitySignIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(postFacilitySignIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = facility_signinSlice.actions;

export default facility_signinSlice.reducer;
