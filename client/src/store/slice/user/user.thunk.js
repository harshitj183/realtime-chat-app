import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosinstance.js"

// Dummy thunk for login, you can replace this with your actual API call later
export const loginUserThunk = createAsyncThunk("user/fetchById", async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", { username, password });
        toast.success(response.data.message || "Logged in successfully");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.message || error.message;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const signupUserThunk = createAsyncThunk("user/signup", async (signupData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/signup", signupData);
        toast.success(response.data.message || "Signed up successfully");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.message || error.message;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const logoutUserThunk = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/logout");
        toast.success(response.data.message || "Logged out successfully");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.message || error.message;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const getUserProfileThunk = createAsyncThunk("user/get-profile", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/get-profile");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.errMessage || error?.response?.data?.message || error.message;
        return rejectWithValue(errorOutput);
    }
});

export const getOtherUsersThunk = createAsyncThunk("user/get-other-users", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/user/other-users");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.errMessage || error?.response?.data?.message || error.message;
        return rejectWithValue(errorOutput);
    }
});

export const updateProfileThunk = createAsyncThunk("user/update-profile", async (updateData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put("/user/update-profile", updateData);
        toast.success(response.data.message || "Profile updated successfully");
        return response.data;
    }
    catch (error) {
        const errorOutput = error?.response?.data?.message || error.message;
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
}); 