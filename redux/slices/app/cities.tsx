import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface cityState {
  loading: boolean;
  data: { name: string; value: string | number }[];
  error: object | null;
}

export const getCities: any = createAsyncThunk(
  `cities/getCities`,
  async (id, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(`${url}/api/app/states/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formated = data.data.map((item: any) => {
        return { name: item.name, value: item.id.toString() };
      });
      return formated;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state using that type
const initialState: cityState = {
  loading: true,
  data: [],
  error: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    resetCities: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCities.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getCities.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getCities.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetCities } = citiesSlice.actions;

export default citiesSlice.reducer;
