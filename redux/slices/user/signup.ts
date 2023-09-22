import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface signupState {
  loading: boolean;
  data: object;
  error: object | null;
}

export const postSignUp: any = createAsyncThunk(
  `signup/postSignUp`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(`${url}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: signupState = {
  loading: true,
  data: {},
  error: null,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(postSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(postSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = signupSlice.actions;

export default signupSlice.reducer;
