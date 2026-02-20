import getnewsinfo from "@/utils/getnewsInfo";
import Image from "next/image";
// প্রফেশনাল আইকনের জন্য lucide-react ব্যবহার করা হলো
import {
  Calendar,
  User,
  ExternalLink,
  ArrowRight,
  Newspaper,
} from "lucide-react";

// ১. স্ট্যাটিক মেটাডেটা সেটআপ (SEO এর জন্য)
export const metadata = {
  title: "Latest News & Updates | BWDO",
  description:
    "Stay informed with the latest developments, impactful stories, and insights from our team at BWDO.",
  openGraph: {
    title: "Latest News & Updates | BWDO",
    description:
      "Read the latest news and updates about our community initiatives and programs.",
    type: "website",
  },
};

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

  // ২. স্ট্রাকচারড ডাটা (Schema Markup) - 'NewsArticle' স্কিমা
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BWDO Latest News",
    itemListElement: newsList?.map((news, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: news.title,
        image: news.imageUrl,
        datePublished: news.date,
        description: news.description,
        url: news.link,
        author: {
          "@type": "Person",
          name: news.author || "BWDO Team",
        },
      },
    })),
  };

  // Loading state fallback
  if (!newsList) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-5 md:px-20 flex items-center justify-center">
        <div className="text-center">
          <Newspaper
            className="w-12 h-12 text-gray-400 animate-pulse mx-auto mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest News & Updates
          </h1>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </main>
    );
  }

  return (
    // ৩. Semantic HTML: <main> ট্যাগ
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Schema Script ইঞ্জেকশন */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-full inline-block">
              <Newspaper
                className="w-12 h-12 text-blue-600"
                aria-hidden="true"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Latest News & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest developments and insights from our
            team.
          </p>
        </header>

        {/* News Grid */}
        {newsList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No news articles available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news) => (
              <article
                key={news._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  {" "}
                  {/* হাইট একটু বাড়ানো হয়েছে ভালো ভিজ্যুয়ালের জন্য */}
                  <Image
                    src={news.imageUrl}
                    alt={`Cover image for ${news.title}`} // ৪. Accessiblity: ডাইনামিক Alt text
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    <a
                      href={news.link}
                      target="_blank" // External link ধরে নিয়ে টার্গেট ব্ল্যাংক দেওয়া হয়েছে
                      rel="noopener noreferrer" // ৫. সিকিউরিটি বেস্ট প্র্যাকটিস
                      className="hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                    >
                      {news.title}
                    </a>
                  </h2>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">
                        {news.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <time dateTime={news.date}>
                        {formatNewsDate(news.date)}
                      </time>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {news.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read full story about ${news.title}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 group/link"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </a>

                    <ExternalLink
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Section (Optional) */}
        {newsList?.length > 0 && (
          <div className="text-center mt-14">
            <button className="bg-white text-gray-700 px-8 py-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold shadow-sm hover:shadow-md flex items-center justify-center gap-2 mx-auto">
              <Newspaper className="w-5 h-5" />
              See More News
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default NewsPage;
