// app/api/blogs/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Blog from "../../../../lib/model/blog";

export const GET = async (req) => {
    try {
        await connectDB();



        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })




        return NextResponse.json({
            blogs,
            message: "blogs find"
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();


        const newBlog = await Blog.create(body);

        return NextResponse.json(newBlog, { status: 201 });

    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};
