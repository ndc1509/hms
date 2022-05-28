import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROOM_STATUS } from "../constants";
import axiosClient from "./axiosClient";

export const getRooms = createAsyncThunk("getRooms", async () => {
    const data = await axiosClient.get(`/rooms`);
    return data.rooms;
});

export const checkIn = createAsyncThunk("checkIn", async (guest) => {
    const data = await axiosClient.post(`/guests/check-in`, guest);
    return data.guest;
});

export const checkOut = createAsyncThunk("checkOut", async (guest) => {
    console.log(typeof guest._id);
    const data = await axiosClient.post(`/guests/check-out`, {
        _id: guest._id,
    });
    return data.guest;
});

export const cleaned = createAsyncThunk("cleaned", async (room) => {
    const data = await axiosClient.put(`/rooms/cleaned/${room.id}`, {
        status: ROOM_STATUS.CLEAN,
    });
    return data.room;
});

export const getGuests = createAsyncThunk("getGuests", async () => {
    const data = await axiosClient.get(`/guests`);
    return data.guests;
});

export const login = createAsyncThunk("login", async (loginInfo) => {
    try {
        const data = await axiosClient.post(`/auth/login`, loginInfo);
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const logout = createAsyncThunk("logout", async () => {
    await axiosClient.delete("/auth/logout");
    return;
});
