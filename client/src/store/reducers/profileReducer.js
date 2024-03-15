// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
};

const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userId = action.payload;
        },
    },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
