import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../store/reducers/postReducer";
import likeReducer from "./reducers/likeReducer";
import commentReducer from "./reducers/commentReducer";
import userReducer from "./reducers/userReducer";
import profileReducer from "./reducers/profileReducer";
import socketReducer from "./reducers/socketReducer";
import storyReducer from "./reducers/storyReducer";
const store = configureStore({
    reducer: { postReducer, likeReducer, commentReducer, storyReducer, userReducer, profileReducer, socketReducer }
})
export default store;