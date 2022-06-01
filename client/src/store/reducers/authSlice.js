import { createSlice } from "@reduxjs/toolkit";
import { login, logout, reauthorize } from "../../api/api";

const initState = {
    reauthorized: false,
    authLoading: true,
    isAuthenticated: false,
    user: null,
    errorMsg: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            const user = JSON.parse(localStorage.getItem("USER"));
            return {
                ...state,
                authLoading: false,
                isAuthenticated: true,
                user,
                errorMsg: null,
            };
        },
        [login.rejected]: (state, action) => {
            const data = action.payload;
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                errorMsg: data.message,
            };
        },
        [logout.fulfilled]: (state, action) => {
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                user: null,
            };
        },
        [reauthorize.fulfilled]: (state, action) => {
            const user = JSON.parse(localStorage.getItem("USER"));
            return {
                ...state,
                reauthorized: true,
                authLoading: false,
                isAuthenticated: true,
                user,
            };
        },
        [reauthorize.rejected]: (state, action) => {
            return {
                ...state,
                reauthorized: true,
            };
        },
    },
});

const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
export default authReducer;
