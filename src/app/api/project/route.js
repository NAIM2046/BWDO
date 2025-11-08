import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Project from "../../../../lib/model/project";

// POST → Create new project
export const POST = async (request) => {
  try {
    await connectDB();
    const data = await request.json();
    const result = await Project.create(data);
    return NextResponse.json(
      { message: "Project created successfully", project: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
};

// GET → Get all projects
export const GET = async () => {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
};
