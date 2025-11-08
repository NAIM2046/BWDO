import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import News from "../../../../../lib/model/news";

// ✅ DELETE single news
export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    console.log("🗑️ Delete request for ID:", id);

    await connectDB();
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("🔥 DELETE error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

// ✅ UPDATE (PUT)
export const PUT = async (req, { params }) => {
  try {
    const { id } = await params;
    console.log("🟢 PUT request for ID:", id);

    const body = await req.json();
    await connectDB();

    const updatedNews = await News.findByIdAndUpdate(id, body, { new: true });

    if (!updatedNews) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    console.error("🔥 PUT error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
