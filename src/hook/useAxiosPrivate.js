"use client";
import { useMemo } from "react";
import { axiosPrivate } from "../utils/axiosInstance";

export default function useAxiosPrivate() {
  useMemo(() => {
    // Response interceptor: যদি 401 বা 403 আসে → login page redirect
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          window.location.href = "/admin/login";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosPrivate;
}
