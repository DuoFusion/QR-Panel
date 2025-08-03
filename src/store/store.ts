import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import layoutSlice from "./slices/layoutSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
