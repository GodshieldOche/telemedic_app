import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userRegisterReducer, { signupState } from "./slices/user/signup";
import userSigninReducer, { signinState } from "./slices/user/signin";
import countryReducer, { countryState } from "./slices/app/country";
import stateReducer, { stateState } from "./slices/app/state";
import cityReducer, { cityState } from "./slices/app/cities";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  country: countryReducer,
  state: stateReducer,
  city: cityReducer,
});

// Define store with redux persist to persist data in local storage
export const store = configureStore({
  reducer: rootReducer,
});

// Inferred type: {app: appState, components: componentState}
export type RootState = {
  userRegister: signupState;
  userSignin: signinState;
  country: countryState;
  state: stateState;
  city: cityState;
};

// `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
