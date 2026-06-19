import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk, signupUserThunk, logoutUserThunk, getUserProfileThunk, getOtherUsersThunk, updateProfileThunk } from './user.thunk.js'

export const userSlice = createSlice({

    name: 'user',
    initialState: {

        isAuthenticated: false,
        token: null,
        user: null,
        userProfile: null,
        otherUsers: [],
        buttonLoading: false,
        screenLoading: false,
        selectedUser: null

    },
    reducers: {

        Login: () => {
            console.log('hello login')
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login User
        builder.addCase(loginUserThunk.pending, (state) => {
            state.buttonLoading = true;
            state.screenLoading = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.userProfile = action.payload.user;
            state.token = action.payload.token;
            state.buttonLoading = false;
            state.screenLoading = false;
        });
        builder.addCase(loginUserThunk.rejected, (state) => {
            state.buttonLoading = false;
            state.screenLoading = false;
        });

        // Signup User
        builder.addCase(signupUserThunk.pending, (state) => {
            state.buttonLoading = true;
        });
        builder.addCase(signupUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.userProfile = action.payload.user;
            state.token = action.payload.token;
            state.buttonLoading = false;
            state.screenLoading = false;
        });
        builder.addCase(signupUserThunk.rejected, (state) => {
            state.buttonLoading = false;
            state.screenLoading = false;
        });

        // Logout User
        builder.addCase(logoutUserThunk.pending, (state) => {
            state.buttonLoading = true;
            state.screenLoading = true;
        });
        builder.addCase(logoutUserThunk.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.userProfile = null;
            state.otherUsers = [];
            state.token = null;
            state.selectedUser = null;
            state.buttonLoading = false;
        });
        builder.addCase(logoutUserThunk.rejected, (state) => {
            state.buttonLoading = false;
            state.screenLoading = false;
        });

        // Get User Profile
        builder.addCase(getUserProfileThunk.pending, (state) => {
            state.screenLoading = true;
        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload.user;
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.user ? true : false;
            state.screenLoading = false;
        });
        builder.addCase(getUserProfileThunk.rejected, (state) => {
            state.screenLoading = false;
        });

        // Get Other Users
        builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
            state.otherUsers = action.payload.users;
        });

        // Update Profile
        builder.addCase(updateProfileThunk.pending, (state) => {
            state.buttonLoading = true;
        });
        builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.userProfile = action.payload.user;
            state.buttonLoading = false;
        });
        builder.addCase(updateProfileThunk.rejected, (state) => {
            state.buttonLoading = false;
        });
    }
})

export const { Login, setSelectedUser } = userSlice.actions

export default userSlice.reducer