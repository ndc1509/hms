import axios from "axios";
import queryString from "query-string";
const axiosBase = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosBase.interceptors.response.use(
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

export default axiosBase;
