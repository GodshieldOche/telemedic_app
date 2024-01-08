import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MedicalHistory } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface medical_historyState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: MedicalHistory | null;
  list: MedicalHistory[];
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

export const getMedicalHistoryDetails: any = createAsyncThunk(
  `medical_history/getMedicalHistoryDetails`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/history/${id}`,
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

export const postAddMedicalHistory: any = createAsyncThunk(
  `medical_history/postAddMedicalHistory`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/history/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addMedicalHistory(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editMedicalHistory: any = createAsyncThunk(
  `medical_history/editMedicalHistory`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/medicals/history/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateMedicalHistory(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMedicalHistory: any = createAsyncThunk(
  `medical_history/deleteMedicalHistory`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/medicals/history/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeMedicalHistory(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: medical_historyState = {
  isListLoading: true,
  isDataLoading: true,
  data: null,
  list: [],
  error: null,
};

export const medical_historySlice = createSlice({
  name: "medical_history",
  initialState,
  reducers: {
    resetMedicalHistory: (state) => {
      return (state = initialState);
    },
    addMedicalHistory: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updateMedicalHistory: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removeMedicalHistory: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMedicalHistory.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getMedicalHistory.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload;
      }),
      builder.addCase(getMedicalHistory.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getMedicalHistoryDetails.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(
        getMedicalHistoryDetails.fulfilled,
        (state, { payload }) => {
          state.isDataLoading = false;
          state.data = payload;
        }
      ),
      builder.addCase(
        getMedicalHistoryDetails.rejected,
        (state, { payload }) => {
          state.isDataLoading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetMedicalHistory,
  updateMedicalHistory,
  removeMedicalHistory,
  addMedicalHistory,
} = medical_historySlice.actions;

export default medical_historySlice.reducer;
