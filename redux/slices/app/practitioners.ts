import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Practitioner, Resource } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

type Ranges = {
  min_price: number;
  max_price: number;
  min_experience: number;
  max_experience: number;
};

// Define a type for the slice state
export interface practitionersState {
  loading: boolean;
  practitioners: {
    list: Resource[];
    itemsPerPage: number;
    total: number;
    page: number;
    ranges: Ranges;
  };
  data: Practitioner | null;
  error: object | null;
}

export const getPractitioners: any = createAsyncThunk(
  `practitioners/getPractitioners`,
  async (
    {
      search_params = {},
      signal,
    }: { signal: AbortSignal; search_params: object },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/practitioners`, {
        params: {
          ...search_params,
        },
        signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPractitioner: any = createAsyncThunk(
  `practitioners/getPractitioner`,
  async (
    { id, signal }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(
        `${url}/api/app/practitioners/${id}`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state using that type
const initialState: practitionersState = {
  loading: true,
  practitioners: {
    list: [],
    itemsPerPage: 0,
    total: 0,
    page: 0,
    ranges: {
      min_price: 0,
      max_price: 0,
      min_experience: 0,
      max_experience: 0,
    },
  },
  data: null,
  error: null,
};

export const practitionersSlice = createSlice({
  name: "practitioners",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPractitioners.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getPractitioners.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.practitioners = {
          list: payload.data,
          itemsPerPage: payload.items_per_page,
          total: payload.total,
          page: payload.page,
          ranges: payload.ranges,
        };
      }),
      builder.addCase(getPractitioners.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(getPractitioner.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getPractitioner.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getPractitioner.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = practitionersSlice.actions;

export default practitionersSlice.reducer;
