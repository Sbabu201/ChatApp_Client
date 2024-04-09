import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";
import { URL } from "../../utils/serverurl";
const backendUrl = process.env.BACKEND;


export const getAllLikes = createAsyncThunk(
    'post/getAllLikes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/post/allLikes`);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const createLikes = createAsyncThunk(
    'post/createLikes',
    async (bagItemData, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${URL}/post/addLike`, bagItemData);
            console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deleteLike = createAsyncThunk(
    'delete/deleteLike',
    async (bagItemId, { rejectWithValue }) => {
        try {
            // console.log('bagItemId', bagItemId)
            const deleted = await axios.delete(`${URL}/post/deleteLike`, { data: { bagItemId } });
            // console.log('deleted', deleted)
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const likeSlice = createSlice({
    name: "like",
    initialState: {
        likes: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllLikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.allLikes ? state.likes = action.payload.allLikes : state.likes = [];
            })
            .addCase(getAllLikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createLikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createLikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.likes.push(action.payload.newPost);
                    // toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(createLikes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteLike.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLike.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                state.likes = state.likes.filter(item => item._id !== action.payload.deleteLike._id);
                // toast.success(action.payload.message)
            })
            .addCase(deleteLike.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default likeSlice.reducer;