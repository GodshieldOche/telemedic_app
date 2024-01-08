import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Practitioner } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerProfileState {
  loading: boolean;
  data: Practitioner | null;
  error: object | null;
}

export const getCurrentPractitionerProfile: any = createAsyncThunk(
  `practitionerProfile/getCurrentPractitionerProfile`,
  async (token, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.get(
        `${url}/api/practitioner/profile/`,
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

export const updateProfileOrBannerImage: any = createAsyncThunk(
  `practitionerProfile/updateProfileOrBannerImage`,
  async ({ body, params }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("practitionerToken");

    try {
      const { data }: any = await axios.put(
        `${url}/api/practitioner/profile/`,
        body,
        {
          params: params,
          headers: {
            "Content-Type": "multipart/form-data",
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

export const updatePractitionerProfile: any = createAsyncThunk(
  `practitionerProfile/updatePractitionerProfile`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("practitionerToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/practitioner/profile/`,
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
const initialState: practitionerProfileState = {
  loading: true,
  data: null,
  error: null,
};

export const practitionerProfileSlice = createSlice({
  name: "practitionerProfile",
  initialState,
  reducers: {
    resetPractitioner: (state) => {
      return (state = initialState);
    },
    updateProfile: (state, { payload }: PayloadAction<Practitioner>) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentPractitionerProfile.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getCurrentPractitionerProfile.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(
        getCurrentPractitionerProfile.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetPractitioner, updateProfile } =
  practitionerProfileSlice.actions;

export default practitionerProfileSlice.reducer;
