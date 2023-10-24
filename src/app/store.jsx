import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";
// import { modalReducer } from "../features/modal/modals";

const store = configureStore({
  reducer: {
    user: userReducer,
    // modal: modalReducer,
  },
});
export default store;
