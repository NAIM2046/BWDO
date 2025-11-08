import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Admin from "../../../../../lib/model/user";
import { createToken } from "../../../../../lib/jwt";

export const POST = async (req) => {
  try {
    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Get email and password from request body
    const { email, password } = await req.json();

    // 3️⃣ Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 4️⃣ Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 5️⃣ Create JWT token
    const token = createToken({ id: admin._id, email: admin.email, role: admin.role });

    // 6️⃣ Send response with HTTP-only cookie
    const res = NextResponse.json({
      message: "Login successful",
      admin: { id: admin._id, email: admin.email, role: admin.role },
    });

    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
