import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface profileState {
  loading: boolean;
  data: User | null;
  error: object | null;
}

export const getCurrentUserProfile: any = createAsyncThunk(
  `profile/getCurrentUserProfile`,
  async (token, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(`${url}/api/user/profile/`, {
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

export const addOrUpdateProfileImage: any = createAsyncThunk(
  `profile/addOrUpdateProfileImage`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");

    try {
      const { data }: any = await axios.put(`${url}/api/user/profile/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateProfile(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile: any = createAsyncThunk(
  `profile/updateUserProfile`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/profile/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateProfile(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: profileState = {
  loading: true,
  data: null,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetUser: (state) => {
      return (state = initialState);
    },
    updateProfile: (state, { payload }: PayloadAction<User>) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserProfile.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getCurrentUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      }),
      builder.addCase(getCurrentUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetUser, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
