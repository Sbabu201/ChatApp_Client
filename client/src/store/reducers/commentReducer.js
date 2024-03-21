import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";


export const getAllComments = createAsyncThunk(
    'post/getAllComments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/post/allComments`);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const createComments = createAsyncThunk(
    'post/createComments',
    async (bagItemData, { rejectWithValue }) => {
        try {
            // console.log('bagItemData', bagItemData)
            const response = await axios.post(`/post/addComment`, bagItemData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deleteComment = createAsyncThunk(
    'delete/deleteComment',
    async (bagItemId, { rejectWithValue }) => {
        try {
            // console.log('bagItemId', bagItemId)
            const deleted = await axios.delete(`/post/deleteComment`, { data: { bagItemId } });
            // console.log('deleted', deleted)
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.allComents ? state.comments = action.payload.allComents : state.comments = [];
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.comments.push(action.payload.newComment);
                    toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(createComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                state.comments = state.comments.filter(item => item._id !== action.payload.deleteComment._id);
                toast.success(action.payload.message)
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default commentSlice.reducer;