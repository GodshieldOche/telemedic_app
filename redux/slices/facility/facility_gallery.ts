import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facilityGalleryState {
  loading: boolean;
  data: object;
  error: object | null;
}

export const postAddToFacilityGallery: any = createAsyncThunk(
  `facility_gallery/postAddToFacilityGallery`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/gallery/`,
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

// Define the initial state using that type
const initialState: facilityGalleryState = {
  loading: true,
  data: {},
  error: null,
};

export const facility_gallerySlice = createSlice({
  name: "facility_gallery",
  initialState,
  reducers: {
    reset: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAddToFacilityGallery.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddToFacilityGallery.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(
        postAddToFacilityGallery.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { reset } = facility_gallerySlice.actions;

export default facility_gallerySlice.reducer;
