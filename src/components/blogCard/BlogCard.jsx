
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      
      {/* Thumbnail */}
   

          <Image
            src={blog.coverImage} // can be a string URL
            alt={blog.title}
            width={800}            // set width in pixels
            height={208}           // set height in pixels (keep aspect ratio)
            className="w-full h-52 object-cover"
          />


      <div className="p-5">
        
        {/* Category */}
        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          {blog.category}
        </span>

        {/* Title */}
        <h2 className="text-xl font-semibold mt-3 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Short Description */}
        <p className="text-gray-600 mb-3 line-clamp-2">
          {blog.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="w-6 h-6 rounded-full border"
          />
          <span className="font-medium">{blog.author.name}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 mb-4">
          {blog.date}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${blog._id}`}
          className="inline-block text-blue-600 font-semibold hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
