import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer, { appState } from "./slices/app/app";
import userRegisterReducer, { signupState } from "./slices/user/signup";
import userSigninReducer, { signinState } from "./slices/user/signin";
import userAddressReducer, { addressState } from "./slices/user/address";
import relationshipReducer, {
  relationshipState,
} from "./slices/user/relationship";
import countryReducer, { countryState } from "./slices/app/country";
import stateReducer, { stateState } from "./slices/app/state";
import degreesReducer, { degreeState } from "./slices/app/degrees";
import languagesReducer, { languagesState } from "./slices/app/languages";
import cityReducer, { cityState } from "./slices/app/cities";
import resourcesReducer, { resourcesState } from "./slices/app/resources";
import locationReducer, { locationState } from "./slices/app/location";
import medical_historyReducer, {
  medical_historyState,
} from "./slices/user/medical_info/medical_history";
import allergyReducer, {
  allergyState,
} from "./slices/user/medical_info/allergy";
import prescriptionReducer, {
  prescriptionState,
} from "./slices/user/medical_info/prescription";
import insuranceReducer, {
  insuranceState,
} from "./slices/user/medical_info/insurance";
import test_resultReducer, {
  test_resultState,
} from "./slices/user/medical_info/test_result";
import practitionersReducer, {
  practitionersState,
} from "./slices/app/practitioners";
import walletReducer, { walletState } from "./slices/user/wallet";
import userAccountReducer, { accountState } from "./slices/user/account";
import practitionerAccountReducer, {
  practitionerAccountState,
} from "./slices/practitioner/account";
import facilitiesReducer, { facilitiesState } from "./slices/app/facilities";
import userProfileReducer, { profileState } from "./slices/user/profile";
import practitionerProfileReducer, {
  practitionerProfileState,
} from "./slices/practitioner/profile";
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
  app: appReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  userProfile: userProfileReducer,
  practitionerProfile: practitionerProfileReducer,
  userAccount: userAccountReducer,
  practitionerAccount: practitionerAccountReducer,
  userAddress: userAddressReducer,
  relationship: relationshipReducer,
  country: countryReducer,
  state: stateReducer,
  city: cityReducer,
  degrees: degreesReducer,
  languages: languagesReducer,
  resources: resourcesReducer,
  practitioners: practitionersReducer,
  location: locationReducer,
  medical_history: medical_historyReducer,
  allergy: allergyReducer,
  insurance: insuranceReducer,
  test_result: test_resultReducer,
  prescription: prescriptionReducer,
  facilities: facilitiesReducer,
  wallet: walletReducer,
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
  app: appState;
  userRegister: signupState;
  userSignin: signinState;
  userProfile: profileState;
  practitionerProfile: practitionerProfileState;
  userAccount: accountState;
  practitionerAccount: practitionerAccountState;
  userAddress: addressState;
  country: countryState;
  relationship: relationshipState;
  state: stateState;
  city: cityState;
  degrees: degreeState;
  languages: languagesState;
  resources: resourcesState;
  practitioners: practitionersState;
  location: locationState;
  medical_history: medical_historyState;
  prescription: prescriptionState;
  allergy: allergyState;
  insurance: insuranceState;
  test_result: test_resultState;
  facilities: facilitiesState;
  wallet: walletState;
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
