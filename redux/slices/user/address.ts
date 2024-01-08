import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddressWithID } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface addressState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: AddressWithID | null;
  list: AddressWithID[];
  itemsPerPage: number;
  total: number;
  page: number;
  error: object | null;
}

export const getAddresses: any = createAsyncThunk(
  `address/getAddresses`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(`${url}/api/user/addresses`, {
        signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAddress: any = createAsyncThunk(
  `address/getAddress`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(`${url}/api/user/addresses/${id}`, {
        signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddAddress: any = createAsyncThunk(
  `address/postAddAddress`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/addresses/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addAddress(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAddress: any = createAsyncThunk(
  `address/editAddress`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/addresses/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateAddress(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddress: any = createAsyncThunk(
  `address/deleteAddress`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/addresses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeAddress(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: addressState = {
  isListLoading: true,
  isDataLoading: true,
  data: null,
  list: [],
  itemsPerPage: 0,
  page: 0,
  total: 0,
  error: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddress: (state) => {
      return (state = initialState);
    },
    addAddress: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updateAddress: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removeAddress: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddresses.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload.data;
        state.itemsPerPage = payload.items_per_page;
        state.total = payload.total;
        state.page = payload.page;
      }),
      builder.addCase(getAddresses.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getAddress.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(getAddress.fulfilled, (state, { payload }) => {
        state.isDataLoading = false;
        state.data = payload;
      }),
      builder.addCase(getAddress.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetAddress, updateAddress, removeAddress, addAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
