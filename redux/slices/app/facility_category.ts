import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Categorish } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facilityCategoryState {
  loading: boolean;
  list: Categorish[];
  types: Categorish[];
  data: Categorish | null;
  error: object | null;
}

export const getFacilityCategories: any = createAsyncThunk(
  `facility_category/getFacilityCategories`,
  async (obj, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(
        `${url}/api/app/facilities/categories`,
        {
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

export const getTypesOnFacilityCategory: any = createAsyncThunk(
  `facility_category/getTypesOnFacilityCategory`,
  async (id, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(
        `${url}/api/app/facilities/categories/${id}/types`,
        {
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
const initialState: facilityCategoryState = {
  loading: true,
  data: null,
  list: [],
  types: [],
  error: null,
};

export const facility_categorySlice = createSlice({
  name: "facility_category",
  initialState,
  reducers: {
    resetFacilityCategory: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFacilityCategories.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getFacilityCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      }),
      builder.addCase(getFacilityCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(getTypesOnFacilityCategory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getTypesOnFacilityCategory.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.types = payload;
        }
      ),
      builder.addCase(
        getTypesOnFacilityCategory.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetFacilityCategory } = facility_categorySlice.actions;

export default facility_categorySlice.reducer;
