import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Admin from "../../../../../lib/model/user";

export  const POST = async (req) => {
    try {
        connectDB() ;
        const { email, password } = await req.json();
         const exist = await Admin.findOne({email}) 
            if (exist) {
                return new Response(JSON.stringify({ message: "Admin already exists" }), { status: 422 });
            }
            const admin = await Admin.create({email, password}) ; 
            return NextResponse.json({ message: "Admin created successfully", admin }, { status: 201 });
    } catch (error) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
