"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
// 1. Import the specific icons you need
import { Heart, Globe, Users, Target } from "lucide-react";

const Volunteerism = () => {
  const stats = {
    totalVolunteers: 1250,
    peopleBenefited: 25000,
  };

  // 2. Replace emojis with Lucide React components and add custom Tailwind colors
  const volunteerBenefits = [
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Personal Growth",
      description: "Develop new skills and gain valuable experience",
      bgColor: "bg-pink-100",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Community Impact",
      description: "Make a real difference in people's lives",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Networking",
      description: "Connect with like-minded individuals",
      bgColor: "bg-green-100",
    },
    {
      icon: <Target className="w-6 h-6 text-purple-500" />,
      title: "Skill Development",
      description: "Learn new skills and enhance your resume",
      bgColor: "bg-purple-100",
    },
  ];

  const [volunteersCount, setVolunteersCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);

  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const duration = 2; // seconds

      const volStep = stats.totalVolunteers / (duration * 60);
      const peopleStep = stats.peopleBenefited / (duration * 60);

      let vol = 0;
      let people = 0;

      const interval = setInterval(() => {
        vol += volStep;
        people += peopleStep;

        if (vol >= stats.totalVolunteers) vol = stats.totalVolunteers;
        if (people >= stats.peopleBenefited) people = stats.peopleBenefited;

        setVolunteersCount(Math.floor(vol));
        setPeopleCount(Math.floor(people));

        if (vol === stats.totalVolunteers && people === stats.peopleBenefited)
          clearInterval(interval);
      }, 1000 / 60);
    }
  }, [inView, stats.totalVolunteers, stats.peopleBenefited]);

  return (
    <div ref={ref} className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          Join Our Volunteer Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mb-8"
        >
          Together, we're creating positive change in our community
        </motion.p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-5 rounded-xl shadow text-center w-40"
          >
            <div className="text-2xl font-bold text-green-600">
              {volunteersCount}+
            </div>
            <div className="text-gray-600 text-sm mt-1">Active Volunteers</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white p-5 rounded-xl shadow text-center w-40"
          >
            <div className="text-2xl font-bold text-blue-600">
              {peopleCount}+
            </div>
            <div className="text-gray-600 text-sm mt-1">People Benefited</div>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left">
          {volunteerBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.2 }}
              className="flex gap-4 items-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 3. Wrap the icon in a colored background circle for a premium look */}
              <div
                className={`p-3 rounded-full flex-shrink-0 ${benefit.bgColor}`}
              >
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Make a Difference?
          </h2>
          <p className="text-green-50 mb-8 max-w-lg mx-auto">
            Join our passionate volunteers and start creating positive change
            today.
          </p>
          <Link
            href={"/volunteer"}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
          >
            Become a Volunteer
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Volunteerism;
