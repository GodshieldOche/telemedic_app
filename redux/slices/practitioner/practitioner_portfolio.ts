import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Certification,
  Education,
  Experience,
  Licence,
} from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface practitionerPortfolioState {
  loading: boolean;
  data: any;
  certifications: Certification[];
  licences: Licence[];
  educations: Education[];
  experiences: Experience[];
  error: object | null;
}

export const postAddPractitionerCertification: any = createAsyncThunk(
  `practitioner_portfolio/postAddPractitionerCertification`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/portfolio/certifications`,
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
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const postAddPractitionerLicence: any = createAsyncThunk(
  `practitioner_portfolio/postAddPractitionerLicence`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/portfolio/licences`,
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
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const postAddPractitionerEducation: any = createAsyncThunk(
  `practitioner_portfolio/postAddPractitionerEducation`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/portfolio/educations`,
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

export const postAddPractitionerExperience: any = createAsyncThunk(
  `practitioner_portfolio/postAddPractitionerExperience`,
  async ({ body, token }: any, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    try {
      const { data }: any = await axios.post(
        `${url}/api/practitioner/portfolio/experiences`,
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

// Define the initial state using that type
const initialState: practitionerPortfolioState = {
  loading: true,
  data: {},
  licences: [],
  certifications: [],
  educations: [],
  experiences: [],
  error: null,
};

export const practitioner_portfolioSlice = createSlice({
  name: "practitioner_portfolio",
  initialState,
  reducers: {
    resetPractitionerPorfolioState: (state) => {
      return (state = initialState);
    },
    // Licence CRUD
    addToPractitionerCertifications: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Certification }>
    ) => {
      return {
        ...state,
        certifications: [...state.certifications, action.payload.data],
      };
    },
    editPractitionerCertification: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Certification; index: number }>
    ) => {
      const clone = [...state.certifications];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        certifications: clone,
      };
    },
    deleteFromPractitionerCertifications: (
      state: practitionerPortfolioState,
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
    addToPractitionerLicences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Licence }>
    ) => {
      return {
        ...state,
        licences: [...state.licences, action.payload.data],
      };
    },
    editPractitionerLicences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Licence; index: number }>
    ) => {
      const clone = [...state.licences];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        licences: clone,
      };
    },
    deleteFromPractitionerLicences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ index: number }>
    ) => {
      return {
        ...state,
        licences: [
          ...state.licences.filter((_, i) => i !== action.payload.index),
        ],
      };
    },

    // Education CRUD
    addToPractitionerEducations: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Education }>
    ) => {
      return {
        ...state,
        educations: [...state.educations, action.payload.data],
      };
    },
    editPractitionerEducations: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Education; index: number }>
    ) => {
      const clone = [...state.educations];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        educations: clone,
      };
    },
    deleteFromPractitionerEducations: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ index: number }>
    ) => {
      return {
        ...state,
        educations: [
          ...state.educations.filter((_, i) => i !== action.payload.index),
        ],
      };
    },

    // Experience CRUD
    addToPractitionerExperiences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Experience }>
    ) => {
      return {
        ...state,
        experiences: [...state.experiences, action.payload.data],
      };
    },
    editPractitionerExperiences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ data: Experience; index: number }>
    ) => {
      const clone = [...state.experiences];
      clone[action.payload.index] = action.payload.data;
      return {
        ...state,
        experiences: clone,
      };
    },
    deleteFromPractitionerExperiences: (
      state: practitionerPortfolioState,
      action: PayloadAction<{ index: number }>
    ) => {
      return {
        ...state,
        experiences: [
          ...state.experiences.filter((_, i) => i !== action.payload.index),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAddPractitionerCertification.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddPractitionerCertification.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postAddPractitionerCertification.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    builder.addCase(postAddPractitionerLicence.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddPractitionerLicence.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postAddPractitionerLicence.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    builder.addCase(postAddPractitionerEducation.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddPractitionerEducation.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postAddPractitionerEducation.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
    builder.addCase(postAddPractitionerExperience.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        postAddPractitionerExperience.fulfilled,
        (state, { payload }) => {
          state.loading = false;
        }
      ),
      builder.addCase(
        postAddPractitionerExperience.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetPractitionerPorfolioState,
  addToPractitionerCertifications,
  addToPractitionerEducations,
  addToPractitionerExperiences,
  addToPractitionerLicences,
  deleteFromPractitionerCertifications,
  deleteFromPractitionerLicences,
  deleteFromPractitionerEducations,
  deleteFromPractitionerExperiences,
  editPractitionerCertification,
  editPractitionerLicences,
  editPractitionerEducations,
  editPractitionerExperiences,
} = practitioner_portfolioSlice.actions;

export default practitioner_portfolioSlice.reducer;
