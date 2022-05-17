import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./reducers/roomsSlice";
import guestReducer from "./reducers/guestsSlice";
const store = configureStore({
    reducer: {
        roomsReducer,
        guestReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store