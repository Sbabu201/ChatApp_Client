import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";
import { URL } from "../../utils/serverurl";


export const getAllStory = createAsyncThunk(
    'user/getAllStory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${URL}/user/allstory`);
            console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const createStory = createAsyncThunk(
    'user/createStory',
    async (bagItemData, { rejectWithValue }) => {
        try {
            // console.log('bagItemData', bagItemData)
            const response = await axios.post(`${URL}/user/addstory`, bagItemData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deleteStory = createAsyncThunk(
    'delete/deleteStory',
    async (id, { rejectWithValue }) => {
        try {
            // console.log('bagItemId', bagItemId)
            const deleted = await axios.delete(`${URL}/user/removestory/${id}`);
            // console.log('deleted', deleted)
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const storySlice = createSlice({
    name: "story",
    initialState: {
        story: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllStory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.allStory ? state.story = action.payload.allStory : state.story = [];
            })
            .addCase(getAllStory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createStory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.story.push(action.payload.addStory);
                    toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(createStory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteStory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                state.story = state.story.filter(item => item._id !== action.payload.deleteStory._id);
                // toast.success(action.payload.message)
            })
            .addCase(deleteStory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default storySlice.reducer;