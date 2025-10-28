"use client";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "RDF launches new volunteer program for youth development",
    author: "RDF Bangladesh Foundation",
    date: "October 25, 2025",
    image:
      "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
    description: "RDF Bangladesh Foundation has launched a new volunteer program aimed at youth development and community engagement.",
    link: "#",
  },
  {
    id: 2,
    title: "Sustainable farming initiatives transform local communities",
    author: "The Daily Observer",
    date: "October 20, 2025",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    description: "Sustainable farming practices are bringing positive changes to local communities across the region.",
    link: "#",
  },
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Latest News & Updates
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsData.map((news) => (
          <motion.div
            key={news.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
                <a href={news.link}>{news.title}</a>
              </h2>
              <div className="text-sm text-gray-500 mt-2">
                By <span className="font-medium">{news.author}</span> •{" "}
                {news.date}
              </div>
              <p className="text-gray-600 mt-3 line-clamp-3">
                {news.description}
              </p>
              <a
                href={news.link}
                className="text-blue-600 mt-4 inline-block font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;