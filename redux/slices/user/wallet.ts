import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AllOnWallet, Pagination, Transaction } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface walletState {
  loading: boolean;
  data: AllOnWallet | null;
  transactions:
    | (Pagination & {
        data: AllOnWallet["transactions"];
      })
    | null;
  transaction: Transaction | null;
  transactionLoading: boolean;
  error: object | null;
}

export const getAllOnWallet: any = createAsyncThunk(
  `wallet/getAllOnWallet`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");

    try {
      const { data }: any = await axios.get(`${url}/api/user/wallet/all`, {
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

export const getAllTransactions: any = createAsyncThunk(
  `wallet/getAllTransactions`,
  async (
    { signal, page = 1 }: { signal: AbortSignal; page: number },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");

    try {
      const { data }: any = await axios.get(
        `${url}/api/user/wallet/transactions?page=${page}`,
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

export const getTransaction: any = createAsyncThunk(
  `wallet/getTransaction`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");

    try {
      const { data }: any = await axios.get(
        `${url}/api/user/wallet/transactions/${id}`,
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
const initialState: walletState = {
  loading: true,
  transactionLoading: true,
  data: null,
  transaction: null,
  transactions: null,
  error: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetWalletState: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOnWallet.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getAllOnWallet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getAllOnWallet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder.addCase(getAllTransactions.pending, (state) => {
      state.transactionLoading = true;
    }),
      builder.addCase(getAllTransactions.fulfilled, (state, { payload }) => {
        state.transactionLoading = false;
        state.transactions = payload;
      }),
      builder.addCase(getAllTransactions.rejected, (state, { payload }) => {
        state.transactionLoading = false;
        state.error = payload;
      });
    builder.addCase(getTransaction.pending, (state) => {
      state.transactionLoading = true;
    }),
      builder.addCase(getTransaction.fulfilled, (state, { payload }) => {
        state.transactionLoading = false;
        state.transaction = payload;
      }),
      builder.addCase(getTransaction.rejected, (state, { payload }) => {
        state.transactionLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetWalletState } = walletSlice.actions;

export default walletSlice.reducer;
