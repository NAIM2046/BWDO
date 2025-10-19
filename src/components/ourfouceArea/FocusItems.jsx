import React from "react";
import {
  GraduationCap,
  Leaf,
  Globe,
  Stethoscope,
  Dumbbell,
  LifeBuoy,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const focusAreas = [
  {
    icon: (
      <GraduationCap className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600" />
    ),
    title: "EDUCATION SUPPORT PROGRAMS",
    description:
      "We focus on providing access to quality education for children and youth to help them reach their full potential.",
    color: "hover:bg-blue-50 border-blue-100",
    gradient: "from-blue-50 to-white",
  },
  {
    icon: (
      <Leaf className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-green-600" />
    ),
    title: "ENVIRONMENT",
    description:
      "We promote environmental awareness and sustainable practices to protect our planet for future generations.",
    color: "hover:bg-green-50 border-green-100",
    gradient: "from-green-50 to-white",
  },
  {
    icon: (
      <Globe className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-amber-600" />
    ),
    title: "CULTURE",
    description:
      "We celebrate and preserve cultural diversity by organizing events that promote unity and social harmony.",
    color: "hover:bg-amber-50 border-amber-100",
    gradient: "from-amber-50 to-white",
  },
  {
    icon: (
      <Stethoscope className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600" />
    ),
    title: "HEALTH SUPPORT INITIATIVES",
    description:
      "We work to ensure access to basic healthcare, mental health awareness, and hygiene support in vulnerable areas.",
    color: "hover:bg-red-50 border-red-100",
    gradient: "from-red-50 to-white",
  },
  {
    icon: (
      <Dumbbell className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-600" />
    ),
    title: "SPORTS ACTIVITIES",
    description:
      "We encourage youth participation in sports to promote teamwork, discipline, and physical well-being.",
    color: "hover:bg-orange-50 border-orange-100",
    gradient: "from-orange-50 to-white",
  },
  {
    icon: (
      <LifeBuoy className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-sky-600" />
    ),
    title: "RELIEF",
    description:
      "During natural disasters and emergencies, we provide timely relief and rehabilitation support to affected families.",
    color: "hover:bg-sky-50 border-sky-100",
    gradient: "from-sky-50 to-white",
  },
  {
    icon: (
      <Briefcase className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-purple-600" />
    ),
    title: "SELF-EMPLOYMENT",
    description:
      "We empower individuals through skill development and entrepreneurship training for sustainable livelihoods.",
    color: "hover:bg-purple-50 border-purple-100",
    gradient: "from-purple-50 to-white",
  },
];
