import { configureStore } from "@reduxjs/toolkit";

import quickViewReducer from "./features/quickView-slice";
import productDetailsReducer from "./features/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    quickViewReducer,
    productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
