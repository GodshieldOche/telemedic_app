import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Allergy } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface allergyState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: Allergy | null;
  list: Allergy[];
  error: object | null;
}

export const getAllergies: any = createAsyncThunk(
  `allergy/getAllergies`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/allergies`,
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

export const getAllergy: any = createAsyncThunk(
  `allergy/getAllergy`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/allergies/${id}`,
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

export const postAddAllergy: any = createAsyncThunk(
  `allergy/postAddAllergy`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/allergies/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addAllergy(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAllergy: any = createAsyncThunk(
  `allergy/editAllergy`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/medicals/allergies/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateAllergy(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllergy: any = createAsyncThunk(
  `allergy/deleteAllergy`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/medicals/allergies/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeAllergy(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: allergyState = {
  isListLoading: true,
  isDataLoading: true,
  data: null,
  list: [],
  error: null,
};

export const allergySlice = createSlice({
  name: "allergy",
  initialState,
  reducers: {
    resetAllergy: (state) => {
      return (state = initialState);
    },
    addAllergy: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updateAllergy: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removeAllergy: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllergies.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getAllergies.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload;
      }),
      builder.addCase(getAllergies.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getAllergy.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(getAllergy.fulfilled, (state, { payload }) => {
        state.isDataLoading = false;
        state.data = payload;
      }),
      builder.addCase(getAllergy.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetAllergy, updateAllergy, removeAllergy, addAllergy } =
  allergySlice.actions;

export default allergySlice.reducer;
