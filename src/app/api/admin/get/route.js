import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Admin from "../../../../../lib/model/user";

export  const GET = async (req) => {
    try {
        connectDB() ;
        const admins = await Admin.find({}).select("-password") ; 
        return NextResponse.json({ admins }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
            const admin = await Admin.create({email, password}) ; 
            return NextResponse.json({ message: "Admin created successfully", admin }, { status: 201 });
    
};
