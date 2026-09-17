

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import assetReducer from "./slices/assetSlice";
import maintenanceReducer from "./slices/maintenanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    assets: assetReducer,
    maintenance: maintenanceReducer,
  },
});

// Support both:
// import store from "../store";
// and
// import { store } from "../store";
export { store };
export default store;