import BlogCard from "@/components/blogCard/BlogCard";
import getAllblogInfo from "@/utils/getAllblogInfo";




const BlogPage = async () => {
  const BlogList = await getAllblogInfo();
 // console.log(BlogList); 
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BlogList?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
