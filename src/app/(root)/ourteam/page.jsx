import getAllTeam from "@/utils/getAllTeam";
import Link from "next/link"; // Link কম্পোনেন্ট ব্যবহার করা ভালো

// ১. স্ট্যাটিক মেটাডেটা সেটআপ
export const metadata = {
  title: "Our Leadership Team | BWDO",
  description:
    "Meet the passionate individuals and leadership team driving positive change at Brotherhood Welfare and Development Organization (BWDO).",
  openGraph: {
    title: "Our Team | BWDO",
    description:
      "Meet the passionate team behind BWDO. We are dedicated to making a difference in our community.",
    images: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    ], // সোশ্যাল শেয়ারের জন্য হিরো ইমেজ
  },
};

const OurTeamPage = async () => {
  const teamMembers = await getAllTeam();

  // ২. স্ট্রাকচারড ডাটা (Schema Markup) - 'Person' স্কিমা
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BWDO Leadership Team",
    description: "The leadership and core team members of BWDO.",
    itemListElement: teamMembers?.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        description: member.bio,
        image: member.image,
        worksFor: {
          "@type": "Organization",
          name: "BWDO",
        },
        // সোশ্যাল লিঙ্কগুলো গুগলের নলেজ গ্রাফের জন্য
        sameAs: [member.social?.linkedin, member.social?.facebook].filter(
          Boolean,
        ), // যেগুলোর লিঙ্ক নেই সেগুলো বাদ পড়বে
      },
    })),
  };

  return (
    // ৩. Semantic HTML: <main> ট্যাগ
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 🌟 Hero Cover Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-yellow-400">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals driving change and making a difference in
            our community
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 Enhanced Team Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <span className="text-blue-500 font-semibold text-lg mb-2 block uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Leadership <span className="text-blue-600">Team</span>
            </h2>
          </header>

          {/* ৪. Semantic List: <ul> এবং <li> ব্যবহার করা হয়েছে */}
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers?.map((member, index) => (
              <li
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 overflow-hidden list-none"
              >
                <article className="p-6 flex flex-col items-center text-center h-full">
                  {/* Image Container */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} at BWDO`} // SEO Image Alt
                      loading="lazy" // ৫. Lazy loading ফর পারফরম্যান্স
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-blue-500 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {member.bio}
                  </p>

                  {/* Social Links - ৬. Accessibility (aria-label) যোগ করা হয়েছে */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-100 w-full justify-center mt-auto">
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s LinkedIn Profile`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}

                    {member.social?.facebook && (
                      <a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s Facebook Profile`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}

                    {member.social?.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        aria-label={`Email ${member.name}`}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 📞 CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help us make a
            difference. Explore volunteer opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 7. Next.js Link কম্পোনেন্ট ব্যবহার */}
            <Link
              href="/volunteer"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Volunteer With Us
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurTeamPage;
