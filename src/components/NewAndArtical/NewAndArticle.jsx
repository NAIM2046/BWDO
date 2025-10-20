import React from "react";

const NewAndArticle = () => {
  // Sample data with live demo images from Picsum
  const articles = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt:
        "Exploring the latest trends and technologies shaping the future of web development with AI, Web3, and modern frameworks.",
      image: "https://picsum.photos/800/600?random=1",
      category: "Technology",
      date: "March 15, 2024",
      readTime: "5 min read",
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: 2,
      title: "Sustainable Design Practices for Modern Websites",
      excerpt:
        "How to create beautiful, functional websites while minimizing environmental impact and improving performance.",
      image: "https://picsum.photos/800/600?random=2",
      category: "Design",
      date: "March 12, 2024",
      readTime: "4 min read",
      author: {
        name: "Mike Chen",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    },
    {
      id: 3,
      title: "Mastering React Performance Optimization",
      excerpt:
        "Advanced techniques to improve your React application's performance and user experience with modern hooks.",
      image: "https://picsum.photos/800/600?random=3",
      category: "Development",
      date: "March 10, 2024",
      readTime: "7 min read",
      author: {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      id: 4,
      title: "The Rise of AI in Frontend Development",
      excerpt:
        "How artificial intelligence is transforming the way we build user interfaces and automate development workflows.",
      image: "https://picsum.photos/800/600?random=4",
      category: "AI",
      date: "March 8, 2024",
      readTime: "6 min read",
      author: {
        name: "Alex Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    },
  ];

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News & Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and stories from our
            team of experts
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="lg:flex">
              <div className="lg:flex-1">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="h-64 lg:h-96 w-full object-cover"
                />
              </div>
              <div className="lg:flex-1 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {featuredArticle.date}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {featuredArticle.author.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {featuredArticle.readTime}
                      </p>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105">
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recent Articles
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {article.author.name}
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 flex items-center gap-1 group-hover:gap-2">
                      Read More
                      <svg
                        className="w-4 h-4 transition-all duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAndArticle;
