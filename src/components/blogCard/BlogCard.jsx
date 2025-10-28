"use client";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
        src={blog.cover}
        alt={blog.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-3 line-clamp-2">{blog.description}</p>
        <p className="text-sm text-gray-500 mb-3">
          By <span className="font-medium">{blog.author}</span> —{" "}
          {blog.date}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
