import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Certification, Licence } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface facilityPortfolioState {
  loading: boolean;
  data: any;
  certifications: Certification[];
  licences: Licence[];
  error: object | null;
}

export const postAddFacilityCertification: any = createAsyncThunk(
  `facility_portfolio/postAddFacilityCertification`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/portfolio/certifications`,
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

export const postAddFacilityLicence: any = createAsyncThunk(
  `facility_portfolio/postAddFacilityLicence`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/facility/portfolio/licences`,
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
const initialState: facilityPortfolioState = {
  loading: true,
  data: {},
  licences: [],
  certifications: [],
  error: null,
};

export const facility_portfolioSlice = createSlice({
  name: "facility_portfolio",
  initialState,
  reducers: {
    resetFacilityPorfolioState: (state) => {
      return (state = initialState);
    },
    // Licence CRUD
    addToFacilityCertifications: (
      state: facilityPortfolioState,
      action: PayloadAction<{ data: Certification }>
    ) => {
      return {
        ...state,
        certifications: [...state.certifications, action.payload.data],
      };
    },
    editFacilityCertification: (
      state: facilityPortfolioState,
      action: PayloadAction<{ data: Certification; index: number }>
    ) => {
      const clone = [...state.certifications];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        certifications: clone,
      };
    },
    deleteFromFacilityCertifications: (
      state: facilityPortfolioState,
      action: PayloadAction<{ index: number }>
    ) => {
      return {
        ...state,
        certifications: [
          ...state.certifications.filter((_, i) => i !== action.payload.index),
        ],
      };
    },

    // Licence CRUD
    addToFacilityLicences: (
      state: facilityPortfolioState,
      action: PayloadAction<{ data: Licence }>
    ) => {
      return {
        ...state,
        licences: [...state.licences, action.payload.data],
      };
    },
    editFacilityLicences: (
      state: facilityPortfolioState,
      action: PayloadAction<{ data: Licence; index: number }>
    ) => {
      const clone = [...state.licences];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        licences: clone,
      };
    },
    deleteFromFacilityLicences: (
      state: facilityPortfolioState,
      action: PayloadAction<{ index: number }>
    ) => {
      return {
        ...state,
        licences: [
          ...state.licences.filter((_, i) => i !== action.payload.index),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAddFacilityCertification.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddFacilityCertification.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(
        postAddFacilityCertification.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    builder.addCase(postAddFacilityLicence.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddFacilityLicence.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.data = payload;
        }
      ),
      builder.addCase(postAddFacilityLicence.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetFacilityPorfolioState,
  addToFacilityCertifications,
  deleteFromFacilityCertifications,
  addToFacilityLicences,
  deleteFromFacilityLicences,
  editFacilityCertification,
  editFacilityLicences,
} = facility_portfolioSlice.actions;

export default facility_portfolioSlice.reducer;
