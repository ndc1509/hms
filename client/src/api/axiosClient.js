import axios from "axios";
import jwt_decode from "jwt-decode";
import queryString from "query-string";
import axiosBase from "./axiosBase";
const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) return config;
    try {
        const tokenPayload = jwt_decode(accessToken);
        const now = new Date();
        if (now.getTime() / 1000 >= tokenPayload.exp) {
            const data = await axiosBase.post("/auth/token");
            accessToken = data.accessToken;
            localStorage.setItem("ACCESS_TOKEN", accessToken);
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
        console.log(error);
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }
        return res;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
