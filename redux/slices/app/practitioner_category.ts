import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Categorish } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerCategoryState {
  loading: boolean;
  list: Categorish[];
  practices: Categorish[];
  data: Categorish | null;
  error: object | null;
}

export const getPractitionerCategories: any = createAsyncThunk(
  `practitioner_category/getPractitionerCategories`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(
        `${url}/api/app/practitioners/categories`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getPracticesOnPractitionerCategory: any = createAsyncThunk(
  `practitioner_category/getPracticesOnPractitionerCategory`,
  async (
    { id, signal }: { id: string; signal: AbortSignal },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(
        `${url}/api/app/practitioners/categories/${id}/practices`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state using that type
const initialState: practitionerCategoryState = {
  loading: true,
  data: null,
  list: [],
  practices: [],
  error: null,
};

export const practitioner_categorySlice = createSlice({
  name: "practitioner_category",
  initialState,
  reducers: {
    resetPractitionerCategory: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPractitionerCategories.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getPractitionerCategories.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.list = payload;
        }
      ),
      builder.addCase(
        getPractitionerCategories.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    builder.addCase(getPracticesOnPractitionerCategory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getPracticesOnPractitionerCategory.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.practices = payload;
        }
      ),
      builder.addCase(
        getPracticesOnPractitionerCategory.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetPractitionerCategory } = practitioner_categorySlice.actions;

export default practitioner_categorySlice.reducer;
