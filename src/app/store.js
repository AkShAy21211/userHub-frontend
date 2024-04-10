import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice"

const store = configureStore({
    reducer:{
        auth:userReducer
    },
})    

export default store;