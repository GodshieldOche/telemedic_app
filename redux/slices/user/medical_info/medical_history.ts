import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface medical_historyState {
  loading: boolean;
  data: User | null;
  list: any[];
  error: object | null;
}

export const getMedicalHistory: any = createAsyncThunk(
  `medical_history/getMedicalHistory`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/history`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: medical_historyState = {
  loading: true,
  data: null,
  list: [],
  error: null,
};

export const medical_historySlice = createSlice({
  name: "medical_history",
  initialState,
  reducers: {
    resetUser: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    // Medical History
    builder.addCase(getMedicalHistory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getMedicalHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getMedicalHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    //   Allergy
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetUser } = medical_historySlice.actions;

export default medical_historySlice.reducer;
