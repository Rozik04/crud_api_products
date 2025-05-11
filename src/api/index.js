import axios from "axios";
// a

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})