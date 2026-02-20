import React from "react";
import Image from "next/image";
import Link from "next/link";
import { focusDetailsList } from "@/components/ourfouceArea/FocusItems";
import {
  ArrowLeft,
  BookOpen,
  HeartPulse,
  Trophy,
  Leaf,
  Palette,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// Professional Icon Picker
const getFocusIcon = (title, className) => {
  const icons = {
    Education: <BookOpen className={className} />,
    Health: <HeartPulse className={className} />,
    Sports: <Trophy className={className} />,
    Conservation: <Leaf className={className} />,
    Culture: <Palette className={className} />,
  };
  return icons[title] || <HeartPulse className={className} />;
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const focusDetails = focusDetailsList.find((item) => item.id == id);

  if (!focusDetails) {
    return { title: "Area Not Found | BWDO" };
  }

  return {
    title: `${focusDetails.title} Initiatives | BWDO`,
    description: focusDetails.description.substring(0, 160),
    openGraph: {
      title: `Empowering through ${focusDetails.title} - BWDO`,
      description: focusDetails.description.substring(0, 160),
      images: [{ url: focusDetails.heroImage || "/og-image.jpg" }],
    },
  };
}
const FocusArea = async ({ params }) => {
  const { id } = await params;
  const focusDetails = focusDetailsList.find((item) => item.id == id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: focusDetails.title,
    description: focusDetails.description,
    provider: {
      "@type": "Organization",
      name: "BWDO",
    },
    areaServed: "Bangladesh",
  };

  if (!focusDetails) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-light text-gray-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Focus area details not found.
        </p>
        <Link
          href="/"
          className="text-emerald-600 font-semibold flex items-center gap-2 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. LIGHT HERO SECTION */}
      <section className="relative pt-12 pb-20 border-b border-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [background-position:center]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  {getFocusIcon(focusDetails.title, "w-6 h-6")}
                </div>
                <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">
                  Initiative
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Empowering through{" "}
                <span className="text-emerald-600">{focusDetails.title}</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-xl">
                {focusDetails.description}
              </p>

              {/* Impact Micro-Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                {focusDetails.impact.stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-100 border-8 border-white">
                {focusDetails.heroImage ? (
                  <Image
                    src={focusDetails.heroImage}
                    alt={focusDetails.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
                    {getFocusIcon(focusDetails.title, "w-32 h-32")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INITIATIVES (Light Cards) */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {focusDetails.ourWork.title}
              </h2>
              <p className="text-slate-500">
                How we are implementing change on the ground across various
                regions of Bangladesh.
              </p>
            </div>
            <div className="h-px flex-grow bg-slate-200 hidden md:block mx-8 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {focusDetails.ourWork.initiatives.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 p-2 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group"
              >
                <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                </div>
                <div className="px-4 pb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FUTURE PLANS (Minimalist List) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {focusDetails.futurePlans.title}
              </h2>
              <p className="text-slate-500 mb-8">
                Our roadmap for the next 5 years focuses on sustainability,
                scalability, and deeper community involvement.
              </p>
              <div className="p-1 bg-emerald-600 w-16 rounded-full" />
            </div>

            <div className="space-y-4">
              {focusDetails.futurePlans.plans.map((plan, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-md hover:border-emerald-50 transition-all group cursor-default"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm font-bold text-sm flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 font-medium pt-1 leading-snug">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIGHT CALL TO ACTION */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-6">
          <div className="bg-emerald-600 rounded-[2rem] p-12 text-center relative overflow-hidden shadow-2xl shadow-emerald-200">
            {/* Abstract Background patterns */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want to support this cause?
              </h2>
              <p className="text-emerald-50 mb-10 text-lg opacity-90 font-light">
                Join our mission to bring lasting change. Whether you give time
                or resources, your contribution matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/volunteer"
                  className="px-10 py-4 bg-white text-emerald-600 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Volunteer <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/donate"
                  className="px-10 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-all border border-emerald-500/30"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FocusArea;
