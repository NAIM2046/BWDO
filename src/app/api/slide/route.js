import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Slide from "../../../../lib/model/slide";

// 🟩 Create a new slide
export const POST = async (request) => {
  try {
    await connectDB();
    const data = await request.json();
    const result = await Slide.create(data);

    return NextResponse.json(
      { message: "Slide created successfully", slide: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating slide:", error);
    return new Response("Failed to create slide", { status: 500 });
  }
};

// 🟦 Get all slides
export const GET = async () => {
  try {
    await connectDB();
    const slides = await Slide.find({}).sort({ number: 1 });
    return NextResponse.json({ slides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return new Response("Failed to fetch slides", { status: 500 });
  }
};

// 🟨 Update a slide (by ID)
export const PUT = async (request) => {
  try {
    await connectDB();

    const { id, ...updatedData } = await request.json();

    if (!id) {
      return new Response("Slide ID is required", { status: 400 });
    }

    const updatedSlide = await Slide.findByIdAndUpdate(id, updatedData, {
      new: true, // return the updated document
    });

    if (!updatedSlide) {
      return new Response("Slide not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Slide updated successfully", slide: updatedSlide },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating slide:", error);
    return new Response("Failed to update slide", { status: 500 });
  }
};

// 🟥 Delete a slide (by ID)
export const DELETE = async (request) => {
  try {
    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return new Response("Slide ID is required", { status: 400 });
    }

    const deletedSlide = await Slide.findByIdAndDelete(id);

    if (!deletedSlide) {
      return new Response("Slide not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Slide deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting slide:", error);
    return new Response("Failed to delete slide", { status: 500 });
  }
};
