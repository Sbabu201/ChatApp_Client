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
export const createUser = createAsyncThunk(
    'post/createLikes',
    async (bagItemData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}/post/addLike`, bagItemData);
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
        filteredUser: null,
        status: "idle",
        error: null
    },
    reducers: {
        filterUser(state, action) {
            alert("hey");
            const userId = localStorage.getItem("userId");
            console.log('reducer userId', userId)
            console.log('userId', userId)
            state.filteredUser = state.users.find(user => user._id === userId); // Filter user by ID
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
                console.log('action.payload', action.payload.usersWithoutPasswords)
                action.payload.usersWithoutPasswords ? state.users = action.payload.usersWithoutPasswords : state.users = [];
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
        // .addCase(createUser.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(createUser.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     console.log('action.payload', action.payload)
        //     if (action.payload.success) {
        //         state.users.push(action.payload.newPost);
        //         toast.success(action.payload.message)
        //     }
        //     else
        //         toast.error(action.payload.message)
        // })
        // .addCase(createUser.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload;
        // })
        // .addCase(deleteUser.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(deleteUser.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     console.log('action.payload', action.payload)
        //     state.users = state.users.filter(item => item._id !== action.payload.deleteUser._id);
        //     toast.success(action.payload.message)
        // })
        // .addCase(deleteUser.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload;
        // });
    }
});
export default userSlice.reducer;
export const { filterUser } = userSlice.actions;