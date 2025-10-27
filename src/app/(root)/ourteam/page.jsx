import React from "react";

const teamMembers = [
  {
    name: "Md. Naim",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Leading with vision and passion for community development.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Fatima Rahman",
    role: "Project Coordinator",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Ensuring projects run smoothly and effectively.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Arif Hossain",
    role: "Finance Officer",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Managing resources for maximum community impact.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Sara Akter",
    role: "Volunteer Manager",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    bio: "Connecting passionate volunteers with meaningful opportunities.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Rahim Khan",
    role: "Community Outreach",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Building bridges between communities and our organization.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Ayesha Begum",
    role: "Education Director",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    bio: "Developing educational programs for underprivileged children.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Kamal Hossain",
    role: "Health Coordinator",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Overseeing health initiatives and medical camps.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  },
  {
    name: "Nusrat Jahan",
    role: "Communications Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Sharing our stories and impact with the world.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#"
    }
  }
];

const OurTeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
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
            The passionate individuals driving change and making a difference in our community
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold text-lg mb-2 block">OUR TEAM</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Leadership <span className="text-blue-600">Team</span>
            </h2>
            
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  {/* Image Container */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:border-blue-500 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* 📞 CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help us make a difference. 
            Explore volunteer opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              🤝 Volunteer With Us
            </a>
            <a
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              📧 Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeamPage;