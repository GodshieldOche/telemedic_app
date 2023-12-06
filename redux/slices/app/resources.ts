import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Resource } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface resourcesState {
  loading: boolean;
  data: Resource[];
  error: object | null;
}

export const getAllResources: any = createAsyncThunk(
  `resources/getAllResources`,
  async (_, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/resources/`, {
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
const initialState: resourcesState = {
  loading: true,
  data: [],
  error: null,
};

export const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllResources.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getAllResources.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getAllResources.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = resourcesSlice.actions;

export default resourcesSlice.reducer;
