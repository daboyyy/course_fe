import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/courseSlices";
import customerInfoReducer from "./slices/customerInfoSlices";

const rootReducer = {
  course: courseReducer,
  customerInfo: customerInfoReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
