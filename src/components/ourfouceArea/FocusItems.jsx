import React from "react";
import {
  GraduationCap,
  Leaf,
  Globe,
  Stethoscope,
  Dumbbell,
  LifeBuoy,
  Briefcase,
} from "lucide-react";

export const focusAreas = [
  {
    id: 3,
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
    id: 1,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 2,
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

export const focusDetailsList = [
  // 🌿 Environment
  {
    id: 1,
    title: "Environment",
    description:
      "Healthy living in Bangladesh is not facilitated by the environmental conditions. Human health, ecosystems, and economic growth in Bangladesh are being threatened by severe air, water, and noise pollution.",
    heroImage:
      "https://i.ibb.co.com/HfHyTxJ9/480847457-643553344899174-5690844239023994956-n.jpg",

    ourWork: {
      title: "Our Environmental Initiatives",
      initiatives: [
        {
          title: "Tree Plantation Programs",
          description:
            "We organized large-scale tree plantation drives to combat air pollution and increase green coverage.",
          image:
            "https://i.ibb.co.com/gMR4Hz5r/480551956-643553328232509-5544192741929111603-n.jpg",
        },
        {
          title: "Area Cleanup Campaigns",
          description:
            "We cleaned multiple areas by removing rubbish and wastages from public spaces to ensure cleaner surroundings.",
          image:
            "https://i.ibb.co.com/8LqKtGyr/480607863-643553534899155-1535853073756227793-n.jpg",
        },
        {
          title: "COVID-19 Relief Activities",
          description:
            "During the COVID-19 pandemic, we distributed vast amounts of masks, sanitizers, and hand gloves to ensure public safety.",
          image:
            "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500&h=300&fit=crop",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Focus on keeping our surroundings clean.",
        "Extend awareness programmes about waste management and its consequences.",
        "Identify and revitalize abandoned areas to make them usable again.",
        "Transform neglected places into healthy and green spaces.",
        "Run more tree plantation programmes and environmental projects.",
      ],
    },

    impact: {
      title: "Our Impact",
      stats: [
        { value: "28-year", label: "Abandoned Pool Renovated" },
        { value: "Multiple", label: "Public Areas Cleaned" },
        { value: "Vast", label: "COVID Protection Items Distributed" },
        { value: "Growing", label: "Community Awareness" },
      ],
    },
  },

  // 💼 Self Employment
  {
    id: 2,
    title: "Self Employment",
    description:
      "Bangladesh has been making steady progress in various socioeconomic metrics since its independence. Although there have been improvements, youth unemployment remains one of the major challenges, which became even more significant during the COVID-19 pandemic.",
    heroImage:
      "https://i.ibb.co.com/Mxf6ZFDS/0e094d4b174af6141879c91238d51e8789cb1b02e0827eb7.jpg",

    ourWork: {
      title: "Our Initiatives for Self Employment",
      initiatives: [
        {
          title: "Support for Physically Challenged Entrepreneurs",
          description:
            "We provided a van and a supply of vegetables to a physically challenged person so he could start a small business and earn a living.",
          image:
            "https://i.ibb.co.com/397W0kRd/481015359-652000927387749-3242818050586740425-n.jpg",
        },
        {
          title: "Livelihood Assistance for Women",
          description:
            "We provided hens and necessary materials to an unemployed elderly woman to help her start poultry rearing and generate income.",
          image:
            "https://images.unsplash.com/photo-1591123120676-1ffad7e4ab6a?w=500&h=300&fit=crop",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Continue to support underprivileged individuals seeking self-employment opportunities.",
        "Provide financial support for small-scale, well-planned startups.",
        "Reduce the number of beggars by engaging them in meaningful work.",
        "Encourage lower-class people to move forward through training and opportunities.",
        "Raise awareness among deprived communities about their rights and responsibilities.",
      ],
    },

    impact: {
      title: "Our Impact",
      stats: [
        { value: "Several", label: "Families Supported" },
        { value: "Increased", label: "Self-Employment Opportunities" },
        { value: "Reduced", label: "Dependence on Aid" },
        { value: "Growing", label: "Community Empowerment" },
      ],
    },
  },

  // 🎓 Education
  {
    id: 3,
    title: "Education",
    description:
      "The education system in Bangladesh presents a mixed picture, with both progress and challenges. While there are positive aspects such as high enrollment in primary education, improved access for girls, and various government initiatives, challenges remain including low completion rates, quality concerns, high dropout rates, and underfunding.",
    heroImage:
      "https://i.ibb.co.com/v6MwsCQf/480451013-642901038297738-2316923828926509337-n.jpg",

    ourWork: {
      title: "Our Educational Initiatives",
      initiatives: [
        {
          title: "Access to Education for Underprivileged Children",
          description:
            "We have made a significant impact by facilitating access to education for underprivileged children, helping them enroll in both madrasas and traditional schools.",
          image:
            "https://i.ibb.co.com/2YZFDFgp/480558912-642901201631055-752435969104055074-n.jpg",
        },
        {
          title: "Providing Educational Accessories",
          description:
            "We distributed essential educational materials to children to support their learning and development.",
          image:
            "https://i.ibb.co.com/6cNSpX5z/474742914-624729296781579-8270032824454922342-n.jpg",
        },
        {
          title: "Online Mobile Library",
          description:
            "We established an online-based mobile library to provide free learning resources and promote continuous education for all.",
          image:
            "https://i.ibb.co.com/NgK7g1D0/470143807-627195032964887-3360290785407722554-n.jpg",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Expand educational programs to include scholarships, tutoring, and mentorship opportunities.",
        "Introduce night-school facilities for working children and adults.",
        "Enhance the online library by adding more diverse educational content and interactive learning tools.",
        "Collaborate with local communities, schools, and government agencies to identify specific educational needs.",
        "Promote inclusive and equitable learning through research, innovation, and advocacy.",
      ],
    },

    impact: {
      title: "Our Impact",
      stats: [
        { value: "Hundreds", label: "Children Enrolled in Schools" },
        { value: "Numerous", label: "Educational Materials Distributed" },
        { value: "Active", label: "Online Library Users" },
        { value: "Growing", label: "Community Engagement in Education" },
      ],
    },
  },

  // 🎭 Culture
  {
    id: 4,
    title: "Culture",
    description:
      "Bangladesh is a country full of cultural bliss with numerous events held throughout the year. People maintain a simple, friendly lifestyle and are very helpful to each other. The brotherly bond among Bengalis remains strong across different races and religions. However, with the increasing influence of satellite channels and internet, Western culture is becoming more popular in urban areas, presenting a cultural shift that cannot be ignored.",
    heroImage:
      " https://i.ibb.co.com/wF90yX5j/480672555-646577361263439-3256034606844737309-n.jpg",

    ourWork: {
      title: "Our Cultural Initiatives",
      initiatives: [
        {
          title: "Cultural Drawing Competitions",
          description:
            "We have organized drawing competitions on various cultural occasions to promote and preserve Bangladeshi artistic traditions.",
          image:
            "https://i.ibb.co.com/prhB8WjH/607072292-881898867731286-375828914609897718-n.jpg",
        },
        {
          title: "Brotherhood Rock Fest 2018",
          description:
            "We arranged this musical event to celebrate the spirit of unity and cultural harmony among Bangladeshis.",
          image:
            "https://i.ibb.co.com/kg0ms79s/480789347-646577677930074-8706153362497736999-n.jpg",
        },
        {
          title: "Flood Victims Rehabilitation Concert 2024",
          description:
            "This concert was organized to support flood victims while showcasing Bangladeshi cultural performances.",
          image:
            "https://i.ibb.co.com/q3MbP13r/480574712-646577417930100-6553517429405694913-n.jpg",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Continue prioritizing and promoting authentic Bangladeshi culture in all our activities",
        "Represent Bengali culture in a dignified and respectful manner internationally",
        "Celebrate and preserve the multifaceted folk heritage of Bengal region",
        "Highlight the rich cultural roots including animist, Buddhist, Hindu, and Muslim influences",
        "Organize more cultural events that showcase traditional Bengali arts and values",
      ],
    },

    impact: {
      title: "Our Cultural Impact",
      stats: [
        { value: "Multiple", label: "Cultural Events Organized" },
        { value: "Successful", label: "Brotherhood Rock Fest 2018" },
        { value: "Recent", label: "Flood Relief Concert 2024" },
        { value: "Ongoing", label: "Cultural Preservation Efforts" },
      ],
    },
  },

  // 🏥 Health
  {
    id: 5,
    title: "Health",
    description:
      "Bangladesh faces a dual health burden with high prevalence of communicable diseases combined with rising non-communicable diseases. Sedentary lifestyles and energy-dense but poorly nutritious diets among young and middle-aged populations are contributing significantly to the growing health challenges in the country.",
    heroImage:
      "https://i.ibb.co.com/0jPjv0BT/470886600-632943999056657-2227297354424323651-n.jpg",

    ourWork: {
      title: "Our Health Initiatives",
      initiatives: [
        {
          title: "Blood Donation Project",
          description:
            "Our ongoing blood donation initiative ensures consistent availability of safe blood for surgical procedures, emergency accidents, and chronically ill patients, making a significant impact in healthcare delivery.",
          image:
            "https://i.ibb.co.com/9mNgj2gg/human-blood-donate-on-white-background-free-vector.jpg",
        },
        {
          title: "COVID-19 Awareness Campaigns",
          description:
            "We launched comprehensive awareness campaigns educating people about the virus, prevention methods, and the importance of social distancing during the pandemic.",
          image:
            "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&h=300&fit=crop",
        },
        {
          title: "PPE Distribution Drive",
          description:
            "We distributed essential protective equipment including masks and hand sanitizers to thousands of people, enabling them to protect themselves and their families effectively.",
          image:
            "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500&h=300&fit=crop",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Expand blood donation services to reach more healthcare facilities and patients",
        "Develop comprehensive public health education programs targeting non-communicable diseases",
        "Establish regular health screening camps for early detection of diseases",
        "Create nutrition awareness campaigns to address poor dietary habits",
        "Build partnerships with healthcare institutions to enhance service delivery",
        "Develop emergency response capabilities for future health crises",
      ],
    },

    impact: {
      title: "Our Health Impact",
      stats: [
        { value: "Sustainable", label: "Blood Supply for Medical Needs" },
        { value: "Thousands", label: "People Reached with COVID Awareness" },
        { value: "Widespread", label: "Distribution of Protective Equipment" },
        { value: "Growing", label: "Community Health Engagement" },
      ],
    },
  },

  // ⚽ Sports
  {
    id: 6,
    title: "Sports",
    description:
      "Bangladesh faces several challenges in sports development, including inadequate facilities, limited access to training, insufficient funding, and lack of infrastructure that hinders the growth of athletic talent across the nation.",
    heroImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop",

    ourWork: {
      title: "Our Sports Initiatives",
      initiatives: [
        {
          title: "Local Tournaments Organization",
          description:
            "We have been actively organizing local sports tournaments to provide platforms for young athletes to showcase their talents and compete at various levels.",
          image:
            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&h=300&fit=crop",
        },
        {
          title: "Athlete Training Programs",
          description:
            "We provide comprehensive training programs and mentorship to support young athletes in developing their skills and reaching their full potential.",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
        },
        {
          title: "Resource Support for Athletes",
          description:
            "We supply necessary sports equipment, gear, and resources to underprivileged athletes who lack access to proper training facilities.",
          image:
            "https://images.unsplash.com/photo-1571019614244-c5c476dee238?w=500&h=300&fit=crop",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Establish comprehensive sports academies across different regions",
        "Partner with national and international sports bodies for expertise exchange",
        "Advocate for increased government and private sector investment in sports",
        "Identify and nurture talented players from local communities",
        "Create programs to engage youth in sports and prevent addiction-related issues",
        "Develop a new generation of passionate sports athletes with proper guidance",
        "Provide equal opportunities for sports enthusiasts from all societal sections",
      ],
    },

    impact: {
      title: "Our Sports Impact",
      stats: [
        { value: "Multiple", label: "Local Tournaments Organized" },
        { value: "Growing", label: "Young Athletes Supported" },
        { value: "Various", label: "Training Programs Conducted" },
        { value: "Expanding", label: "Community Sports Engagement" },
      ],
    },
  },
  // 🆘 Relief
  {
    id: 7,
    title: "Relief",
    description:
      "In Bangladesh, relief donations typically consist of food, clean water, shelter materials, medical supplies, and hygiene kits - essential items that sustain the lives of disaster and emergency victims. Our country frequently faces challenges such as floods, cyclones, and other calamities that devastate communities and strain resources.",
    heroImage:
      "https://i.ibb.co.com/7t1T6GG5/475139675-658621886488868-3716490946867603255-n.jpg",

    ourWork: {
      title: "Our Relief Initiatives",
      initiatives: [
        {
          title: "Emergency Disaster Response",
          description:
            "We provide crucial support during emergencies and natural disasters, delivering essential supplies like food, clean water, medical aid, and temporary shelter to affected populations during crises including COVID-19 pandemic, floods, cyclones, and heatwaves.",
          image:
            "https://i.ibb.co.com/dscQ9ZSS/475194643-658622076488849-1475702895992744588-n.jpg",
        },
        {
          title: "Wall of Love - Clothing Distribution",
          description:
            "We have created 'Wall of Love' initiatives to provide clothing to those in need, ensuring people have basic necessities for dignity and protection.",
          image:
            "https://i.ibb.co.com/Zp1hxgK7/470145100-626575176360206-6358282416595588034-n.jpg",
        },
        {
          title: "Eid Gifts and Seasonal Support",
          description:
            "We distribute Eid gifts, food, and clothes to children and local communities during festive seasons, bringing joy and relief to underprivileged families.",
          image:
            "https://i.ibb.co.com/Mxw24z3x/470081391-626430326374691-2803187203754277467-n.jpg",
        },
      ],
    },

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Enhance relief operations by establishing more aware communities",
        "Increase community preparedness programs for disaster management",
        "Forge partnerships with global humanitarian organizations",
        "Develop a more resilient and responsive relief network across Bangladesh",
        "Expand volunteer networks for faster emergency response",
        "Create sustainable relief systems that can quickly mobilize during crises",
        "Implement technology-driven solutions for efficient relief distribution",
      ],
    },

    impact: {
      title: "Our Relief Impact",
      stats: [
        { value: "Multiple", label: "Disaster Responses" },
        { value: "Thousands", label: "People Provided Essential Supplies" },
        { value: "Various", label: "Emergency Crises Addressed" },
        { value: "Growing", label: "Community Resilience Built" },
      ],
    },
  },
];
