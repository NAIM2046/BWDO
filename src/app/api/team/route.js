// /app/api/team/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Team from "../../../../lib/model/team";

// 🟢 Create a new team member
export const POST = async (request) => {
  try {
    await connectDB();
    const data = await request.json();
    const result = await Team.create(data);
    return NextResponse.json(
      { message: "Team member created successfully", teamMember: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return new Response("Failed to create team member", { status: 500 });
  }
};

// 🟡 Get all team members
export const GET = async () => {
  try {
    await connectDB();
    const team = await Team.find({}).sort({ rank: 1 });
    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return new Response("Failed to fetch team members", { status: 500 });
  }
};

// 🟠 Update a team member by ID
export const PUT = async (request) => {
  try {
    await connectDB();
    const { id, ...updatedData } = await request.json();

    if (!id) {
      return new Response("Team member ID is required", { status: 400 });
    }

    const updatedMember = await Team.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedMember) {
      return new Response("Team member not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Team member updated successfully", teamMember: updatedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating team member:", error);
    return new Response("Failed to update team member", { status: 500 });
  }
};

// 🔴 Delete a team member by ID
export const DELETE = async (request) => {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return new Response("Team member ID is required", { status: 400 });
    }

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return new Response("Team member not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team member:", error);
    return new Response("Failed to delete team member", { status: 500 });
  }
};
