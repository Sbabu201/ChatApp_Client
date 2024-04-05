// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
const user = JSON.parse(localStorage.getItem("info"));
const initialState = {
    userId: null,
    isAuthenticated: user,
    postId: null
};

const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userId = action.payload;
        },
        setPost(state, action) {
            state.postId = action.payload;
        },
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setUser, setAuthenticated, setPost } = profileSlice.actions;

export default profileSlice.reducer;
