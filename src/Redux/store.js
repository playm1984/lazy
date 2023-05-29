import { configureStore } from "@reduxjs/toolkit";
import nativeSlice from "./nativeSlice";

export const store = configureStore({
  reducer: {
    nativeSlice,
  },
});
