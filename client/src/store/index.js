import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./reducers/roomsSlice";
import guestReducer from "./reducers/guestsSlice";
import authReducer from "./reducers/authSlice";
import saveTokenMiddleware from "../middlewares/saveToken.middleware";
const store = configureStore({
    reducer: {
        roomsReducer,
        guestReducer,
        authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveTokenMiddleware)
})

export default store