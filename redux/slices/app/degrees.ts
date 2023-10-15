import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Categorish } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface degreeState {
  loading: boolean;
  data: Categorish[];
  error: object | null;
}

export const getDegrees: any = createAsyncThunk(
  `degrees/getDegrees`,
  async (_, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/degrees/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state using that type
const initialState: degreeState = {
  loading: true,
  data: [],
  error: null,
};

export const degreesSlice = createSlice({
  name: "degrees",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDegrees.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getDegrees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getDegrees.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = degreesSlice.actions;

export default degreesSlice.reducer;
