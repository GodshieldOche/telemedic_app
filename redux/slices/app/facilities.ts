import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Facility, Resource } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facilitiesState {
  loading: boolean;
  list: Resource[];
  data: Facility | null;
  error: object | null;
}

export const getFacilities: any = createAsyncThunk(
  `facilities/getFacilities`,
  async (
    {
      search_params = "",
      signal,
    }: { signal: AbortSignal; search_params: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(
        `${url}/api/app/facilities?${search_params}`,
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

export const getFacility: any = createAsyncThunk(
  `facilities/getFacility`,
  async (
    { id, signal }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/facilities/${id}`, {
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

// Define the initial state using that type
const initialState: facilitiesState = {
  loading: true,
  list: [],
  data: null,
  error: null,
};

export const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFacilities.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getFacilities.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      }),
      builder.addCase(getFacilities.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(getFacility.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getFacility.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getFacility.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = facilitiesSlice.actions;

export default facilitiesSlice.reducer;
