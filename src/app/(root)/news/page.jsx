import getnewsinfo from "@/utils/getnewsInfo";
import Image from "next/image";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaExternalLinkAlt,
  FaArrowRight,
  FaNewspaper 
} from "react-icons/fa";
import { HiClock } from "react-icons/hi";

export function formatNewsDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
   
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

const NewsPage = async () => {
  const newsList = await getnewsinfo();
  
  // Loading state fallback
  if (!newsList) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaNewspaper className="text-4xl text-gray-400 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Latest News & Updates
            </h1>
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaNewspaper className="text-5xl text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Latest News & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest developments and insights from our team
          </p>
        </div>

        {/* News Grid */}
        {newsList.length === 0 ? (
          <div className="text-center py-12">
            <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 text-lg">No news articles available at the moment.</div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news) => (
              <article
                key={news._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    <a 
                      href={news.link} 
                      className="hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                    >
                      {news.title}
                    </a>
                  </h2>

                  {/* Meta Information */}
                  <div className="flex flex-col  sm:flex-row sm:items-center text-sm text-gray-500 mb-3 gap-3">
                    <div className="flex items-center">
                      <FaUser className="w-3 h-3 mr-1 text-blue-500" />
                      <span className="font-medium text-gray-700">{news.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="w-3 h-3 mr-1 text-blue-500" />
                      <time dateTime={news.date}>
                        {formatNewsDate(news.date)}
                      </time>
                    </div>
                   
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {news.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <a
                      href={news.link}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 group/link"
                    >
                      Read Full Story
                      <FaArrowRight className="w-3 h-3 ml-2 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </a>
                    
                    {/* External Link Indicator */}
                    <FaExternalLinkAlt className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Section (Optional) */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 mx-auto">
            <FaNewspaper className="w-4 h-4" />
            See More 
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;