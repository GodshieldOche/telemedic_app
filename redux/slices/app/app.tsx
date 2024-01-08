import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Categorish, Modal } from "../../../utils/interface";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface appState {
  loading: boolean;
  modal: Modal;
  medications: Categorish[];
  error: object | null;
}

export const getMedications: any = createAsyncThunk(
  `app/getMedications`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;

    try {
      const { data }: any = await axios.get(`${url}/api/app/medications`, {
        signal,
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
const initialState: appState = {
  loading: true,
  modal: {
    active: false,
    type: "Error",
  },
  medications: [],
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
    setModal: (state, action: PayloadAction<{ modal: Modal }>) => {
      return (state = {
        ...state,
        modal: action.payload.modal,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMedications.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getMedications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.medications = payload;
      }),
      builder.addCase(getMedications.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates, setModal } = appSlice.actions;

export default appSlice.reducer;
