import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./reducers/roomsSlice";

const store = configureStore({
    reducer: {
        roomsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store