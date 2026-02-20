import BlogCard from "@/components/blogCard/BlogCard";
import getAllblogInfo from "@/utils/getAllblogInfo";

export const metadata = {
  title:
    "Latest News & Stories | Brotherhood Welfare Development Organization - BWDO",
  description:
    "Stay updated with BWDO's latest initiatives, social welfare stories, and community development projects across Bangladesh.",
  keywords: [
    "BWDO Blog",
    "Social Work Stories Bangladesh",
    "NGO News Bangladesh",
    "Community Development",
  ],
  alternates: {
    canonical: "https://www.bwdobd.com/blog",
  },
  openGraph: {
    title: "BWDO Official Blog - Stories of Change",
    description:
      "Read about our impact on education, health, and conservation in Bangladesh.",
    url: "https://www.bwdobd.com/blog",
    type: "website",
    siteName: "BWDO",
  },
};

const BlogPage = async () => {
  const BlogList = await getAllblogInfo();
  // console.log(BlogList);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "BWDO Official Blog",
    description:
      "Latest news and articles from Brotherhood Welfare Development Organization.",
    url: "https://www.bwdobd.com/blog",
    blogPost: BlogList?.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `https://www.bwdobd.com/blog/${blog._id}`,
      datePublished: blog.date,
    })),
  };
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
