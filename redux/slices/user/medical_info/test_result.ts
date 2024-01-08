import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TestResult } from "../../../../utils/interface";
import { getSecureValueFor } from "../../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface test_resultState {
  isListLoading: boolean;
  isDataLoading: boolean;
  data: TestResult | null;
  list: TestResult[];
  error: object | null;
}

export const getTestResults: any = createAsyncThunk(
  `test_results/getTestResults`,
  async (signal: AbortSignal, { rejectWithValue }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/test_results`,
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

export const getTestResult: any = createAsyncThunk(
  `test_results/getTestResult`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/medicals/test_results/${id}`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res: TestResult = {
        healthCenter: data.data.healthCenter,
        date: data.data.date,
        test: data.data.test,
        id: data.data.id,
        result_file: {
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

export const postAddTestResult: any = createAsyncThunk(
  `test_results/postAddTestResult`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/medicals/test_results/`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addTestResult(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTestResult: any = createAsyncThunk(
  `test_results/editTestResult`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/medicals/test_results/${id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateTestResult(data.data));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTestResult: any = createAsyncThunk(
  `test_results/deleteTestResult`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/medicals/test_results/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeTestResult(id));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: test_resultState = {
  isDataLoading: true,
  isListLoading: true,
  data: null,
  list: [],
  error: null,
};

export const test_resultsSlice = createSlice({
  name: "test_results",
  initialState,
  reducers: {
    resetTestResult: (state) => {
      return (state = initialState);
    },
    addTestResult: (state, { payload }) => {
      return (state = { ...state, list: [...state.list, payload] });
    },
    updateTestResult: (state, { payload }) => {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      return (state = { ...state, list: newList });
    },
    removeTestResult: (state, { payload }) => {
      const newList = state.list.filter((item) => item.id !== payload);
      return (state = { ...state, list: newList });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTestResults.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getTestResults.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.list = payload;
      }),
      builder.addCase(getTestResults.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getTestResult.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(getTestResult.fulfilled, (state, { payload }) => {
        state.isDataLoading = false;
        state.data = payload;
      }),
      builder.addCase(getTestResult.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const {
  resetTestResult,
  updateTestResult,
  removeTestResult,
  addTestResult,
} = test_resultsSlice.actions;

export default test_resultsSlice.reducer;
