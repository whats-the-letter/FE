import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosApi = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});
