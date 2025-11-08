// app/api/blogs/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Blog from "../../../../../lib/model/blog";

// GET single blog by ID
export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = await params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(blog, { status: 200 });

    } catch (error) {

        console.error('Error fetching blog:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};

// UPDATE blog by ID
export const PUT = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = await params;
        const body = await req.json();

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedBlog, { status: 200 });

    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};

// DELETE blog by ID
export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        const { id } = await params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Blog deleted successfully', blog: deletedBlog },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};
