import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/api";

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
            if (isSuccess)
                return {
                    ...state,
                    authLoading: false,
                    isAuthenticated: true,
                    user: data.user,
                    errorMsg: null,
                };
            else
                return {
                    ...state,
                    authLoading: true,
                    isAuthenticated: false,
                    errorMsg: data.message,
                };
        },
    },
});

const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
export default authReducer;
