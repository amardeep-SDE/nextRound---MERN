import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";
import chatReducer from "./chatSlice";  
export const appStore = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
        chat: chatReducer
    }
})