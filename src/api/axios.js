import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { getToken } from "../utils/token";

console.log("API URL FROM AXIOS:", API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {

        const token = getToken();

        console.log("TOKEN FROM STORAGE:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("AUTH HEADER:", config.headers.Authorization);
        } else {
            console.log("NO TOKEN FOUND");
        }
         console.log("AUTH HEADER:", config.headers.Authorization);

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;