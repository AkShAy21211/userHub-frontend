import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postSlice from "./features/post/postSlice";
import profileReducer from "./features/user/profileSlice";
const store = configureStore({
    reducer:{
        auth:userReducer,
        profile:profileReducer,
        post:postSlice
    },
})    

export default store;