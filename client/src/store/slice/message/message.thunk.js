import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosinstance.js";

export const getMessagesThunk = createAsyncThunk(
    "message/getMessages",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/messages/${id}`);
            return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.message || error.message;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
);

export const sendMessageThunk = createAsyncThunk(
    "message/sendMessage",
    async ({ id, message }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/messages/send/${id}`, { message });
            return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.message || error.message;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
);
