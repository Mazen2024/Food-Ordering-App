import { Environments } from "@/contants/enums";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartslice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});

/// Custom Types
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
