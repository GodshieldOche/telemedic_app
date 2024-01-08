import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface accountState {
  loading: boolean;
  data: User | null;
  error: object | null;
}

export const changeUserPassword: any = createAsyncThunk(
  `account/changeUserPassword`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.put(
        `${url}/api/user/account/change-password`,
        body,
        {
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

export const deleteUserAccount: any = createAsyncThunk(
  `account/deleteUserAccount`,
  async (_: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/account/delete`,
        {
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
const initialState: accountState = {
  loading: true,
  data: null,
  error: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetUser: (state) => {
      return (state = initialState);
    },
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetUser } = accountSlice.actions;

export default accountSlice.reducer;
