import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userRegisterReducer, { signupState } from "./slices/user/signup";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
});

// Define store with redux persist to persist data in local storage
export const store = configureStore({
  reducer: rootReducer,
});

// Inferred type: {app: appState, components: componentState}
export type RootState = {
  userRegister: signupState;
};

// `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
