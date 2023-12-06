import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocationGeocodedAddress } from "expo-location";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface locationState {
  loading: boolean;
  location: LocationGeocodedAddress;
  error: object | null;
}

// Define the initial state using that type
const initialState: locationState = {
  loading: true,
  location: {
    city: "Abuja",
    country: "Nigeria",
    district: "",
    streetNumber: "",
    street: "Maitama",
    region: "",
    subregion: "",
    postalCode: "",
    name: "",
    isoCountryCode: "",
    timezone: "",
  },
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
    setLocation: (
      state,
      action: PayloadAction<{ location: LocationGeocodedAddress }>
    ) => {
      return (state = {
        ...state,
        location: action.payload.location,
      });
    },
  },
  extraReducers: (builder) => {},
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates, setLocation } = locationSlice.actions;

export default locationSlice.reducer;
