import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";
import { URL } from "../../utils/serverurl";
const backendUrl = process.env.BACKEND;


export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/post/allPost`);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const createPost = createAsyncThunk(
    'post/createPost',
    async (bagItemData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${URL}/post/create`, bagItemData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (bagItemId, { rejectWithValue }) => {
        try {
            const deleted = await axios.delete(`${URL}/bag/removeBag/${bagItemId}`);
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.allPosts ? state.posts = action.payload.allPosts : state.posts = [];
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.posts.push(action.payload.newPost);
                    toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('action.payload', action.payload)
                state.posts = state.posts.filter(item => item._id !== action.payload.deletePost._id);
                toast.success(action.payload.message)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default postSlice.reducer;