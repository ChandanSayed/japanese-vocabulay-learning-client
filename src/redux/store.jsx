import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/user/user-slice";

export default configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
