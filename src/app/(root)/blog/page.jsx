import BlogCard from "@/components/blogCard/BlogCard";


const demoBlogs = [
  {
    id: 1,
    slug: "education-for-all",
    title: "Education for All: Our New Campaign",
    description:
      "Learn about our latest initiative to bring quality education to underprivileged children across rural Bangladesh.",
    author: "RDF Bangladesh Foundation",
    date: "October 20, 2025",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    id: 2,
    slug: "women-empowerment",
    title: "Empowering Women Through Skills Training",
    description:
      "Discover how our vocational training programs are helping women achieve financial independence and self-confidence.",
    author: "RDF Bangladesh Foundation",
    date: "October 18, 2025",
    cover: "https://images.unsplash.com/photo-1556767576-cfba5c1b0a9f",
  },
];

const BlogPage = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
