import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userRegisterReducer, { signupState } from "./slices/user/signup";
import userSigninReducer, { signinState } from "./slices/user/signin";
import countryReducer, { countryState } from "./slices/app/country";
import stateReducer, { stateState } from "./slices/app/state";
import cityReducer, { cityState } from "./slices/app/cities";
import degreesReducer, { degreeState } from "./slices/app/degrees";
import practitionerCategoryReducer, {
  practitionerCategoryState,
} from "./slices/app/practitioner_category";
import facilityCategoryReducer, {
  facilityCategoryState,
} from "./slices/app/facility_category";
import facilityRegisterReducer, {
  facility_signupState,
} from "./slices/facility/facility_signup";
import facilitySigninReducer, {
  facilitySigninState,
} from "./slices/facility/facility_signin";
import facilityPortfolioReducer, {
  facilityPortfolioState,
} from "./slices/facility/facility_portfolio";
import facilityGalleryReducer, {
  facilityGalleryState,
} from "./slices/facility/facility_gallery";
import practitionerRegisterReducer, {
  practitioner_signupState,
} from "./slices/practitioner/practitioner_signup";
import practitionerSigninReducer, {
  practitionerSigninState,
} from "./slices/practitioner/practitioner_signin";
import practitionerPortfolioReducer, {
  practitionerPortfolioState,
} from "./slices/practitioner/practitioner_portfolio";
import practitionerGalleryReducer, {
  practitionerGalleryState,
} from "./slices/practitioner/practitioner_gallery";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  country: countryReducer,
  state: stateReducer,
  city: cityReducer,
  degrees: degreesReducer,
  practitionerCategory: practitionerCategoryReducer,
  facilityCategory: facilityCategoryReducer,
  facilityRegister: facilityRegisterReducer,
  facilitySignin: facilitySigninReducer,
  facilityPortfolio: facilityPortfolioReducer,
  facilityGallery: facilityGalleryReducer,
  practitionerRegister: practitionerRegisterReducer,
  practitionerSignin: practitionerSigninReducer,
  practitionerPortfolio: practitionerPortfolioReducer,
  practitionerGallery: practitionerGalleryReducer,
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
  degrees: degreeState;
  practitionerCategory: practitionerCategoryState;
  facilityCategory: facilityCategoryState;
  facilityRegister: facility_signupState;
  facilitySignin: facilitySigninState;
  facilityPortfolio: facilityPortfolioState;
  facilityGallery: facilityGalleryState;
  practitionerRegister: practitioner_signupState;
  practitionerSignin: practitionerSigninState;
  practitionerPortfolio: practitionerPortfolioState;
  practitionerGallery: practitionerGalleryState;
};

// `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
