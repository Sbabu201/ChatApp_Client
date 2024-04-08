import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";
import { URL } from "../../utils/serverurl";

export const getAllUsers = createAsyncThunk(
    'get/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            // alert("hello")
            const response = await axios.get(`${URL}/user/allUsers`);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const getProfile = createAsyncThunk(
    'user/userDetails',
    async (id, { rejectWithValue }) => {
        try {
            // alert("hii")
            const response = await axios.get(`${URL}/user/details/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deleteUser = createAsyncThunk(
    'delete/deleteLike',
    async (bagItemId, { rejectWithValue }) => {
        try {
            console.log('bagItemId', bagItemId)
            const deleted = await axios.delete(`${URL}/post/deleteLike`, { data: { bagItemId } });
            console.log('deleted', deleted)
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        profile: [],
        filteredUser: null,
        status: "idle",
        status2: "idle",
        error: null
    },
    reducers: {
        setUserDetails(state, action) {
            return {
                ...state,
                profile: action.payload
            };
        },
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload.usersWithoutPasswords)
                action.payload.usersWithoutPasswords ? state.users = action.payload.usersWithoutPasswords : state.users = [];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status2 = 'failed';
                state.error = action.payload;
            })
            .addCase(getProfile.pending, (state) => {
                state.status2 = 'loading';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status2 = 'succeeded';
                // console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.profile = action.payload.existUser;
                    // toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

    }
});
export default userSlice.reducer;
export const { setUserDetails } = userSlice.actions;