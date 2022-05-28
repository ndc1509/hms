import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../api/api";

const initState = {
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
            const data = action.payload;
            const isSuccess = data.success;
            const user = JSON.parse(localStorage.getItem("USER"))
            if (isSuccess && user)
                return {
                    ...state,
                    authLoading: false,
                    isAuthenticated: true,
                    user,
                    errorMsg: null,
                }
            else
                return {
                    ...state,
                    authLoading: true,
                    isAuthenticated: false,
                    errorMsg: data.message,
                }
        },
        [logout.fulfilled]: (state, action) => {
            return {
                ...state,
                authLoading: true,
                isAuthenticated: false,
                user: null
            }
        }
    },
});

const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
export default authReducer;
