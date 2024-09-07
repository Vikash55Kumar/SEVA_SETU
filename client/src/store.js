import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducer/notificationReducer";
import userReducer from "./reducer/userReducer";

const store = configureStore ({
    reducer : {
        notification:notificationReducer,
        user:userReducer,
    }
})

export default store;

