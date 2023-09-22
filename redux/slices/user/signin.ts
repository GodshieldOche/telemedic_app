import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { saveSecure } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface signinState {
  loading: boolean;
  data: object;
  error: object | null;
}

export const postSignIn: any = createAsyncThunk(
  `signin/postSignIn`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/auth/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = data.data.token;
      await saveSecure("userToken", token);
      return data.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: signinState = {
  loading: true,
  data: {},
  error: null,
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignIn.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postSignIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(postSignIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = signinSlice.actions;

export default signinSlice.reducer;
