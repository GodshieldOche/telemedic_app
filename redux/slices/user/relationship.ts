import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Contact, Relationship } from "../../../utils/interface";
import { getSecureValueFor } from "../../../utils/helper";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface relationshipState {
  isListLoading: boolean;
  isRequestLoading: boolean;
  isDataLoading: boolean;
  isContactsLoading: boolean;
  data: Relationship | null;
  contacts: Contact[];
  relationships: {
    list: Relationship[];
    itemsPerPage: number;
    total: number;
    page: number;
  };
  requests: {
    list: Relationship[];
    itemsPerPage: number;
    total: number;
    page: number;
  };
  error: object | null;
}

export const getFamilyAndFriends: any = createAsyncThunk(
  `relationship/getFamilyAndFriends`,
  async (
    {
      signal,
      is_approved = true,
    }: { signal: AbortSignal; is_approved: boolean },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/relationships?is_approved=${is_approved}`,
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

export const getFamilyAndFriendsRequests: any = createAsyncThunk(
  `relationship/getFamilyAndFriendsRequests`,
  async (
    { signal, query }: { signal: AbortSignal; query: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/relationships/requests?q=${query}`,
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

export const searchContacts: any = createAsyncThunk(
  `relationship/searchContacts`,
  async (
    { signal, query }: { signal: AbortSignal; query: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/relationships/contacts?q=${query}`,
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

export const getFamilyFriendDetails: any = createAsyncThunk(
  `relationship/getFamilyFriendDetails`,
  async (
    { signal, id }: { signal: AbortSignal; id: string },
    { rejectWithValue }
  ) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.get(
        `${url}/api/user/relationships/${id}`,
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

export const postAddAddFamilyAndFriend: any = createAsyncThunk(
  `relationship/postAddAddFamilyAndFriend`,
  async (body: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.post(
        `${url}/api/user/relationships/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getFamilyAndFriends({ signal: null, is_approved: true }));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptRelationshipRequest: any = createAsyncThunk(
  `relationship/acceptRelationshipRequest`,
  async ({ body, id }: any, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.patch(
        `${url}/api/user/relationships/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getFamilyAndFriends({ signal: null, is_approved: true }));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRelationship: any = createAsyncThunk(
  `relationship/deleteRelationship`,
  async (id: string, { rejectWithValue, dispatch }) => {
    const url = process.env.EXPO_PUBLIC_API_URL;
    const token = await getSecureValueFor("userToken");
    try {
      const { data }: any = await axios.delete(
        `${url}/api/user/relationships/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getFamilyAndFriends({ signal: null, is_approved: true }));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the initial state using that type
const initialState: relationshipState = {
  isListLoading: true,
  isDataLoading: true,
  isContactsLoading: false,
  isRequestLoading: true,
  data: null,
  contacts: [],
  relationships: {
    itemsPerPage: 0,
    page: 0,
    total: 0,
    list: [],
  },
  requests: {
    itemsPerPage: 0,
    page: 0,
    total: 0,
    list: [],
  },
  error: null,
};

export const relationshipSlice = createSlice({
  name: "relationship",
  initialState,
  reducers: {
    resetAddress: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFamilyAndFriends.pending, (state) => {
      state.isListLoading = true;
    }),
      builder.addCase(getFamilyAndFriends.fulfilled, (state, { payload }) => {
        state.isListLoading = false;
        state.relationships = {
          list: payload.data,
          itemsPerPage: payload.items_per_page,
          total: payload.total,
          page: payload.page,
        };
      }),
      builder.addCase(getFamilyAndFriends.rejected, (state, { payload }) => {
        state.isListLoading = false;
        state.error = payload;
      });
    builder.addCase(getFamilyAndFriendsRequests.pending, (state) => {
      state.isRequestLoading = true;
    }),
      builder.addCase(
        getFamilyAndFriendsRequests.fulfilled,
        (state, { payload }) => {
          state.isRequestLoading = false;
          state.requests = {
            list: payload.data,
            itemsPerPage: payload.items_per_page,
            total: payload.total,
            page: payload.page,
          };
        }
      ),
      builder.addCase(
        getFamilyAndFriendsRequests.rejected,
        (state, { payload }) => {
          state.isRequestLoading = false;
          state.error = payload;
        }
      );
    builder.addCase(getFamilyFriendDetails.pending, (state) => {
      state.isDataLoading = true;
    }),
      builder.addCase(
        getFamilyFriendDetails.fulfilled,
        (state, { payload }) => {
          state.isDataLoading = false;
          state.data = payload;
        }
      ),
      builder.addCase(getFamilyFriendDetails.rejected, (state, { payload }) => {
        state.isDataLoading = false;
        state.error = payload;
      });
    builder.addCase(searchContacts.pending, (state) => {
      state.isContactsLoading = true;
    }),
      builder.addCase(searchContacts.fulfilled, (state, { payload }) => {
        state.isContactsLoading = false;
        state.contacts = payload;
      }),
      builder.addCase(searchContacts.rejected, (state, { payload }) => {
        state.isContactsLoading = false;
        state.error = payload;
      });
  },
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetAddress } = relationshipSlice.actions;

export default relationshipSlice.reducer;
