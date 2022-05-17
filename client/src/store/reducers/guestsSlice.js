import { createSlice } from "@reduxjs/toolkit";
import { checkIn, checkOut, getGuests } from "../../api/api";

const initialState = {
    allGuests: [],
    ready: false,
};

const guestsSlice = createSlice({
    name: "guests",
    initialState,
    reduces: {},
    extraReducers: {
        [getGuests.fulfilled]: (state, action) => {
            const guests = action.payload;
            state.allGuests = guests;
            state.ready = true;
        },
        [checkIn.fulfilled]: (state, action) => {
            const checkInGuest = action.payload;
            state.allGuests = [...state.allGuests, checkInGuest];
        },
        [checkOut.fulfilled]: (state, action) => {
            const checkOutGuest = action.payload;
            state.allGuests = state.allGuests.filter(
                (guest) => guest._id !== checkOutGuest._id
            );
        },
    },
});
const guestReducer = guestsSlice.reducer;

export const guestsSelector = (state) => state.guestReducer.allGuests;
export const guestsStatus = (state) => state.guestReducer.ready;

export default guestReducer;
