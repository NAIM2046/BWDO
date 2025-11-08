import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["heading", "subheading", "paragraph", "blockquote", "image"],
    required: true,
  },
  text: { type: String },
  imageUrl: { type: String }, // optional if type = image
}, { _id: false });

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    author: {
      name: { type: String, required: true },
      role: { type: String },
      avatar: { type: String },
    },
    date: {
      type: String, // could also be Date, but you’re using formatted text
      required: true,
    },
    readTime: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
    content: [contentSchema],
    gallery: [
      {
        type: String,
      },
    ],
    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
