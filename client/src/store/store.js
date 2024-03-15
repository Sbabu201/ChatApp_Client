import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../store/reducers/postReducer";
import likeReducer from "./reducers/likeReducer";
import commentReducer from "./reducers/commentReducer";
import userReducer from "./reducers/userReducer";
import profileReducer from "./reducers/profileReducer";
const store = configureStore({
    reducer: { postReducer, likeReducer, commentReducer, userReducer, profileReducer }
})
export default store;