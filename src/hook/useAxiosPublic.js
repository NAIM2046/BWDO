"use client";
import { useMemo } from "react";
import { axiosPublic } from "../utils/axiosInstance";

export default function useAxiosPublic() {
  return useMemo(() => axiosPublic, []);
}
