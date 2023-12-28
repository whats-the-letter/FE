import axios, { AxiosInstance } from "axios";

export const createAxios = (baseURL: string): AxiosInstance =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": baseURL,
    },
  });

export const dearNewYearAxios = createAxios(process.env.NEXT_PUBLIC_BASE_URL!);

export const localAxios = createAxios("http://localhost:3000"!);
