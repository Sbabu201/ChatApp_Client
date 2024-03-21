// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
const user = JSON.parse(localStorage.getItem("info"));
const initialState = {
    userId: null,
    isAuthenticated: false
};

const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userId = action.payload;
        },
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setUser, setAuthenticated } = profileSlice.actions;

export default profileSlice.reducer;
