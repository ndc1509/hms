import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOM_STATUS } from "../constants";

const host = 'https://cannonfort.herokuapp.com'
export const getRooms = createAsyncThunk("getRooms", async () => {
    const res = await axios.get(`${host}/api/rooms`);
    return res.data.rooms;
});

export const checkIn = createAsyncThunk("checkIn", async (guest) => {
    const res = await axios.post(
        `${host}/api/guests/check-in`,
        guest
    );
    return res.data.guest;
});

export const checkOut = createAsyncThunk("checkOut", async (guest) => {
    console.log(typeof guest._id);
    const res = await axios.post(
       `${host}/api/guests/check-out`,
        { _id: guest._id }
    );
    return res.data.guest;
});

export const cleaned = createAsyncThunk("cleaned", async (room) => {
    const res = await axios.put(
        `${host}/api/rooms/cleaned/${room.id}`,
        { status: ROOM_STATUS.CLEAN }
    );
    return res.data.room;
});

export const getGuests = createAsyncThunk("getGuests", async () => {
    const res = await axios.get(`${host}/api/guests`);
    return res.data.guests;
});
