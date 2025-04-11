import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";
export const appStore = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
    }
})