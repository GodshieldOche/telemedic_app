import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Insurance } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface insuranceState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: Insurance | null;
  list: Insurance[];
  error: object | null;
}

export const getInsurances: any = createAsyncThunk(
  `insurance/getInsurances`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/insurances`,
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

export const getInsurance: any = createAsyncThunk(
  `insurance/getInsurance`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/insurances/${id}`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res: Insurance = {
        name: data.data.name,
        from: data.data.from,
        to: data.data.to,
        id: data.data.id,
        number: data.data.number,
        insurance_doc: {
          uri: data.data.media.url,
          name: data.data.media.url.split("Z").pop(),
          type: data.data.media.content_type,
        },
      };
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postAddInsurance: any = createAsyncThunk(
  `insurance/postAddInsurance`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/insurances/`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addInsurance(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editInsurance: any = createAsyncThunk(
  `insurance/editInsurance`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/medicals/insurances/${id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateInsurance(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInsurance: any = createAsyncThunk(
  `insurance/deleteInsurance`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/medicals/insurances/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeInsurance(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: insuranceState = {
  isListLoading: true,
  isDataLoading: true,
  data: null,
  list: [],
  error: null,
};

export const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    resetInsurance: (state) => {
      return (state = initialState);
    },
    addInsurance: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updateInsurance: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removeInsurance: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInsurances.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getInsurances.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload;
      }),
      builder.addCase(getInsurances.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getInsurance.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(getInsurance.fulfilled, (state, { payload }) => {
        state.isDataLoading = false;
        state.data = payload;
      }),
      builder.addCase(getInsurance.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetInsurance,
  updateInsurance,
  removeInsurance,
  addInsurance,
} = insuranceSlice.actions;

export default insuranceSlice.reducer;
