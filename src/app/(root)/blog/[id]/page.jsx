import getsingleBlog from "@/utils/getsingleBlog";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getsingleBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found | BWDO",
    };
  }

  return {
    title: `${blog.title} | BWDO Blog`,
    description: blog.excerpt || blog.content?.[0]?.text?.substring(0, 160),
    alternates: {
      canonical: `https://www.bwdobd.com/blog/${id}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "Read more about this initiative by BWDO.",
      url: `https://www.bwdobd.com/blog/${id}`,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}
export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blogDetail = await getsingleBlog(id);
  if (!blogDetail) {
    notFound();
  }

  // ২. গুগল সার্চ ইঞ্জিনের জন্য স্ট্রাকচারড ডাটা (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogDetail.title,
    image: blogDetail.coverImage,
    author: {
      "@type": "Person",
      name: blogDetail.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "BWDO",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bwdobd.com/logo.png",
      },
    },
    datePublished: blogDetail.date,
    description: blogDetail.excerpt || blogDetail.title,
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/blog" className="hover:text-blue-600 transition">
            Blog
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{blogDetail.title}</span>
        </nav>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <Image
            src={blogDetail.coverImage}
            alt="Cover"
            width={1200}
            height={600}
            className="w-full h-72 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Title & Meta */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            {blogDetail.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <img
                src={blogDetail.author.avatar}
                alt={blogDetail.author.name}
                className="w-12 h-12 rounded-full border border-gray-200 object-cover"
              />
              <div className="text-left">
                <div className="font-medium text-gray-800">
                  {blogDetail.author.name}
                </div>
                <div>{blogDetail.author.role}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

            <div>
              <span>{blogDetail.date}</span> <span className="mx-2">•</span>
              <span>{blogDetail.readTime}</span>
            </div>
          </div>

          {/* Tags & Category */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {blogDetail.category}
            </span>
            {blogDetail.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* Blog Content */}
        <section className="mt-12 max-w-4xl mx-auto prose prose-blue prose-lg">
          {blogDetail.content.map((block, idx) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-semibold text-gray-900 mt-10 mb-3"
                  >
                    {block.text}
                  </h2>
                );
              case "subheading":
                return (
                  <h3
                    key={idx}
                    className="text-xl font-medium text-gray-800 mt-8 mb-2"
                  >
                    {block.text}
                  </h3>
                );
              case "paragraph":
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed">
                    {block.text}
                  </p>
                );
              case "blockquote":
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-blue-400 bg-blue-50 text-blue-900 italic px-6 py-3 rounded-lg my-6"
                  >
                    {block.text}
                  </blockquote>
                );
              case "image":
                return (
                  <div key={idx} className="my-6">
                    <Image
                      src={block.imageUrl} // make sure imageUrl exists
                      alt={`blog-image-${idx}`}
                      width={600}
                      height={400}
                      className="w-full max-h-[500px] sm:max-h-[300px] object-cover rounded-lg"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}

          {/* Gallery */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Photo Highlights</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogDetail.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-56 object-cover rounded-xl shadow-sm hover:shadow-md transition-all"
                />
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-3">
              Watch: Video Highlights
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${blogDetail.videoUrl}`}
                title="Project Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      {/* Footer spacing */}
      <div className="h-20"></div>
    </main>
  );
}
