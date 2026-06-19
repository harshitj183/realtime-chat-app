import { createSlice } from '@reduxjs/toolkit';
import { getMessagesThunk, sendMessageThunk } from './message.thunk.js';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        loading: false
    },
    reducers: {
        clearMessages: (state) => {
            state.messages = [];
        }
    },
    extraReducers: (builder) => {
        // Get Messages
        builder.addCase(getMessagesThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
            state.messages = action.payload.messages || [];
            state.loading = false;
        });
        builder.addCase(getMessagesThunk.rejected, (state) => {
            state.loading = false;
        });

        // Send Message
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
            state.messages.push(action.payload.responseData);
        });
    }
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
