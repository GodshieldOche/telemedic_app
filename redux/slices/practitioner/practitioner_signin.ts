import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { saveSecure } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerSigninState {
  loading: boolean;
  data: object;
  error: object | null;
}

export const postPractitionerSignIn: any = createAsyncThunk(
  `practitioner_signin/postPractitionerSignIn`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/auth/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("practitionerToken", token);
      return data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: practitionerSigninState = {
  loading: true,
  data: {},
  error: null,
};

export const practitioner_signinSlice = createSlice({
  name: "practitioner_signin",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postPractitionerSignIn.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postPractitionerSignIn.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(postPractitionerSignIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = practitioner_signinSlice.actions;

export default practitioner_signinSlice.reducer;
