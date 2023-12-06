import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerGalleryState {
  loading: boolean;
  data: object;
  media: {
    images: any[];
    videos: any[];
  };
  error: object | null;
}

export const postAddToPractitionerGallery: any = createAsyncThunk(
  `practitioner_gallery/postAddToPractitionerGallery`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/gallery/`,
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
const initialState: practitionerGalleryState = {
  loading: true,
  data: {},
  media: {
    images: [],
    videos: [],
  },
  error: null,
};

export const practitioner_gallerySlice = createSlice({
  name: "practitioner_gallery",
  initialState,
  reducers: {
    resetPractitionerGallery: (state) => {
      return (state = initialState);
    },
    setPractitionerMedia: (
      state: practitionerGalleryState,
      action: PayloadAction<{
        data: {
          images: any[];
          videos: any[];
        };
      }>
    ) => {
      return {
        ...state,
        media: action.payload.data,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAddToPractitionerGallery.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddToPractitionerGallery.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(
        postAddToPractitionerGallery.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetPractitionerGallery, setPractitionerMedia } =
  practitioner_gallerySlice.actions;

export default practitioner_gallerySlice.reducer;
