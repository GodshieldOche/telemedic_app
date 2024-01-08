import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Prescription } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface prescriptionState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: Prescription | null;
  list: Prescription[];
  error: object | null;
}

export const getPrescriptions: any = createAsyncThunk(
  `prescription/getPrescriptions`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/prescriptions`,
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

export const getPrescription: any = createAsyncThunk(
  `prescription/getPrescription`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/prescriptions/${id}`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = {
        ...data.data,
        medication_image: {
          uri: data.data.media?.url,
          name: data.data.media?.url.split("Z").pop(),
          type: data.data.media?.content_type,
        },
      };
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddPrescription: any = createAsyncThunk(
  `prescription/postAddPrescription`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/prescriptions/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addPrescription(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddOrUpdatePrescriptionMedia: any = createAsyncThunk(
  `prescription/postAddOrUpdatePrescriptionMedia`,
  async ({ body, id }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/prescriptions/${id}/media`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const editPrescription: any = createAsyncThunk(
  `prescription/editPrescription`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/medicals/prescriptions/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updatePrescription(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePrescription: any = createAsyncThunk(
  `prescription/deletePrescription`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/medicals/prescriptions/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removePrescription(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: prescriptionState = {
  isListLoading: true,
  isDataLoading: true,
  data: null,
  list: [],
  error: null,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    resetPrescription: (state) => {
      return (state = initialState);
    },
    addPrescription: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updatePrescription: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removePrescription: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPrescriptions.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getPrescriptions.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload;
      }),
      builder.addCase(getPrescriptions.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getPrescription.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(getPrescription.fulfilled, (state, { payload }) => {
        state.isDataLoading = false;
        state.data = payload;
      }),
      builder.addCase(getPrescription.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetPrescription,
  updatePrescription,
  removePrescription,
  addPrescription,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
