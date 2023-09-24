import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Country } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface countryState {
  loading: boolean;
  data: Country[];
  error: object | null;
}

export const getCountries: any = createAsyncThunk(
  `countries/getCountries`,
  async (obj, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(`${url}/api/app/countries`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formated = data.data.map((item: any) => {
        let code = item.phone_code;
        const first_index = item?.phone_code?.split("")[0].trim();
        if (first_index !== "+") {
          code = `+${item.phone_code}`;
        }

        return {
          name: item.name,
          value: item.id.toString(),
          code: item.iso2,
          phone_code: code,
          emoji: item.emoji,
        };
      });
      return formated;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state using that type
const initialState: countryState = {
  loading: true,
  data: [],
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getCountries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getCountries.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = countriesSlice.actions;

export default countriesSlice.reducer;
