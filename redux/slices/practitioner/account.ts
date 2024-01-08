import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerAccountState {
  loading: boolean;
  data: User | null;
  error: object | null;
}

export const changePractitionerPassword: any = createAsyncThunk(
  `account/changePractitionerPassword`,
  async (body: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("practitionerToken");
    try {
      const { data }: any = await axios.put(
        `${url}/api/practitioner/account/change-password`,
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

export const deletePractitionerAccount: any = createAsyncThunk(
  `account/deletePractitionerAccount`,
  async (_: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("practitionerToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/practitioner/account/delete`,
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
const initialState: practitionerAccountState = {
  loading: true,
  data: null,
  error: null,
};

export const practitionerAccountSlice = createSlice({
  name: "practitionerAccount",
  initialState,
  reducers: {
    resetUser: (state) => {
      return (state = initialState);
    },
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetUser } = practitionerAccountSlice.actions;

export default practitionerAccountSlice.reducer;
