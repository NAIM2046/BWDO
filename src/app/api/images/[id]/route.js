import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Image from "../../../../../lib/model/image";

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: "Image ID is required" }, { status: 400 });
        }

        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return NextResponse.json({ message: "Image not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
