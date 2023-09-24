import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface stateState {
  loading: boolean;
  data: { name: string; value: string | number }[];
  error: object | null;
}

export const getStates: any = createAsyncThunk(
  `states/getStates`,
  async (id, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/countries/${id}`, {
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
const initialState: stateState = {
  loading: true,
  data: [],
  error: null,
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStates.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getStates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getStates.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates } = statesSlice.actions;

export default statesSlice.reducer;
