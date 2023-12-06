import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Language } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface languagesState {
  loading: boolean;
  data: Language[];
  error: object | null;
}

export const getLanguages: any = createAsyncThunk(
  `languages/getLanguages`,
  async (_, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/languages/`, {
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
const initialState: languagesState = {
  loading: true,
  data: [],
  error: null,
};

export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getLanguages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getLanguages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = languagesSlice.actions;

export default languagesSlice.reducer;
