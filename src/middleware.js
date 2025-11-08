import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  //console.log("Middleware token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    //console.log("Middleware payload:", payload);

    if (payload.id.role !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
