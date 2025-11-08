import { NextResponse } from "next/server";

export const POST = async () => {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return res;
};
