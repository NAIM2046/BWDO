import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Image from "../../../../lib/model/image";

export async function POST(req) {
    try {
        await connectDB();

        const { title, images } = await req.json();

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json({ message: "No images provided" }, { status: 400 });
        }

        // প্রতিটি ইমেজের জন্য আলাদা ডকুমেন্ট তৈরি করা
        const docs = images.map((img) => ({ title, image: img }));
        const savedDocs = await Image.insertMany(docs);

        return NextResponse.json(savedDocs, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const images = await Image.find();
        return NextResponse.json(images, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching images" }, { status: 500 });
    }
}
