"use client";

import useAxiosPrivate from "@/hook/useAxiosPrivate";
import React, { useState, useEffect } from "react";

export default function BlogList({ setFormData, setEditingId }) {
  const AxiosSecure = useAxiosPrivate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await AxiosSecure.get("/api/blogs");
      console.log(response.data);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await AxiosSecure.delete(`/api/blogs/${id}`);

      if (response) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        alert("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  // ✅ New handleEdit function
  const handleEdit = (blog) => {
    setEditingId(blog._id);

    setFormData({
      title: blog.title || "",
      coverImage: blog.coverImage || "",
      author: {
        name: blog.author?.name || "",
        role: blog.author?.role || "",
        avatar: blog.author?.avatar || "",
      },
      date: new Date(blog.date).toISOString().split("T")[0] || "",
      category: blog.category || "",
      readTime: blog.readTime || "",
      tags: blog.tags || [],
      gallery: blog.gallery || [],
      content: blog.content || [],
      videoUrl: blog.videoUrl || "",
      shortDescription: blog.shortDescription || "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <img
                  src={blog?.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">
                    {blog.author.name}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{blog.date}</span>
                </div>

                {blog?.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
                    {blog?.category}
                  </span>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(blog)} // 👈 sets editing & form data
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blogs found. Create your first blog!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
