import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modal } from "../../../utils/interface";

export type error = {
  errors: {}[];
};

// Define a type for the slice state
export interface appState {
  loading: boolean;
  modal: Modal;
  error: object | null;
}

// Define the initial state using that type
const initialState: appState = {
  loading: true,
  modal: {
    active: false,
    type: "Error",
  },
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetStates: (state) => {
      return (state = initialState);
    },
    setModal: (state, action: PayloadAction<{ modal: Modal }>) => {
      return (state = {
        ...state,
        modal: action.payload.modal,
      });
    },
  },
  extraReducers: (builder) => {},
});

// // Other code such as selectors can use the imported `RootState` type
export const { resetStates, setModal } = appSlice.actions;

export default appSlice.reducer;
