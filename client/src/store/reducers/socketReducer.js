import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from "react-hot-toast";


export const getAllArrivalMessage = createAsyncThunk(
    'user/getAllArrivalMessage',
    async (to, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/message/allArrival`, to);
            // console.log('response', response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to add a bag item
export const addArrivalMessage = createAsyncThunk(
    'post/addArrivalMessage',
    async (arrivalMessage, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/message/addArrival`, arrivalMessage);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a bag item
export const deleveArrivalMessage = createAsyncThunk(
    'delete/deleveArrivalMessage',
    async (bagItemId, { rejectWithValue }) => {
        console.log('bagItemId', bagItemId)
        if (!bagItemId) {
            return
        }
        try {
            console.log('bagItemId', bagItemId)
            const deleted = await axios.delete(`/message/deleteArrival/${bagItemId}`);
            console.log('deleted', deleted)
            return deleted.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const arrivalMessageSlice = createSlice({
    name: "arrivalMessage",
    initialState: {
        arrivalMessage: [],
        singleMessage: {},
        status: "idle",
        error: null
    },
    reducers: {
        setSingleMessage(state, action) {
            state.singleMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllArrivalMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllArrivalMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log('action.payload', action.payload)
                action.payload.messages ? state.arrivalMessage = action.payload.messages : state.arrivalMessage = [];
            })
            .addCase(getAllArrivalMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addArrivalMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addArrivalMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('action.payload', action.payload)
                if (action.payload.success) {
                    state.arrivalMessage.push(action.payload.arrivalMessage);
                    toast.success(action.payload.message)
                }
                else
                    toast.error(action.payload.message)
            })
            .addCase(addArrivalMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleveArrivalMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleveArrivalMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('action.payload', action.payload)
                state.arrivalMessage = state.arrivalMessage.filter(item => item._id !== action.payload?.deleteMessages?._id);
                // toast.success(action.payload?.message)
            })
            .addCase(deleveArrivalMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export const { setSingleMessage } = arrivalMessageSlice.actions;

export default arrivalMessageSlice.reducer;