// app/api/api.ts
import axios from "axios";
import { API_BASE_URL } from "./config";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
});

// (tuỳ chọn) log lỗi cho dễ debug
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API Error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
