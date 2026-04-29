import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "";

export const axiosPublic = axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});