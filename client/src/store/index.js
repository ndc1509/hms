import { configureStore } from "@reduxjs/toolkit";
import saveTokenMiddleware from "../middlewares/saveToken.middleware";
import authReducer from "./reducers/authSlice";
import guestReducer from "./reducers/guestsSlice";
import roomsReducer from "./reducers/roomsSlice";
const store = configureStore({
    reducer: {
        roomsReducer,
        guestReducer,
        authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveTokenMiddleware),
});

export default store;
