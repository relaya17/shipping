// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contactReducer from './contactSlice';
import languageReducer from './languageSlice';
import cartReducer from './cartSlice';
import moveReducer from '../redux/moveSlice';
import freeQuoteReducer from '../redux/freeQuoteSlice';
import trustedMovingCompanyReducer from '../redux/trustedMovingCompanySlice';
import movingServicesReducer from './movingServicesSlice';
import tipsReducer from './tipsSlice';
import podcastReducer from './podcastSlice';
import freeMovingQuoteReducer from "../redux/freeMovingQuoteSlice";
import motorcycleToEuropeReducer from "../redux/motorcycleToEuropeSlice";
import movingInsuranceReducer from "../redux/movingInsuranceSlice";
import comparingQuotesReducer from "../redux/comparingQuotesSlice";
import customsReducer from "./customsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    language: languageReducer,
    cart: cartReducer,
    move: moveReducer,
    freeQuote: freeQuoteReducer,
    trustedMovingCompany: trustedMovingCompanyReducer,  
    movingServices: movingServicesReducer,
    tips: tipsReducer,
    podcast: podcastReducer,
    freeMovingQuote: freeMovingQuoteReducer,
    motorcycleToEurope: motorcycleToEuropeReducer,
    movingInsurance: movingInsuranceReducer,
    comparingQuotes: comparingQuotesReducer,
    customs: customsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // הוספת export default
