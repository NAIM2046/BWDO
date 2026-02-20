import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Admin from "../../../../../lib/model/user";

export  const DELETE = async (req) => {
    try {
        connectDB() ;
        const { id } = await req.json();
        const admin = await Admin.findByIdAndDelete(id) ;
        return NextResponse.json({ message: "Admin deleted successfully", admin }, { status: 200 });
    } catch (error) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
