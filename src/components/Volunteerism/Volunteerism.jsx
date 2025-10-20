"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Volunteerism = () => {
  const stats = {
    totalVolunteers: 1250,
    peopleBenefited: 25000,
  };

  const volunteerBenefits = [
    {
      icon: "💖",
      title: "Personal Growth",
      description: "Develop new skills and gain valuable experience",
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "Make a real difference in people's lives",
    },
    {
      icon: "🤝",
      title: "Networking",
      description: "Connect with like-minded individuals",
    },
    {
      icon: "🎯",
      title: "Skill Development",
      description: "Learn new skills and enhance your resume",
    },
  ];

  const [volunteersCount, setVolunteersCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const duration = 2; // seconds

      const volStep = stats.totalVolunteers / (duration * 60); // 60 fps approx
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
      }, 1000 / 60); // 60fps
    }
  }, [inView, stats.totalVolunteers, stats.peopleBenefited]);

  return (
    <div ref={ref} className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          Join Our Volunteer Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mb-8"
        >
          Together, we're creating positive change in our community
        </motion.p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1, y: 0 }}
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
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {volunteerBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.2 }}
              className="flex gap-3 items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="text-2xl">{benefit.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white shadow"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Make a Difference?
          </h2>
          <p className="text-green-100 mb-6">
            Join our passionate volunteers and start creating positive change
            today
          </p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Become a Volunteer Now
          </button>
          <p className="text-green-200 mt-4 text-sm">
            No experience required • Flexible hours • Training provided
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Volunteerism;
