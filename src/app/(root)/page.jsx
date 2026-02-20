import NewAndArticle from "@/components/NewAndArtical/NewAndArticle";
import FocusArea from "@/components/ourfouceArea/FocusArea";
import Slider from "@/components/slider/Slider";
import Volunteerism from "@/components/Volunteerism/Volunteerism";
import WhoAreWe from "@/components/WhoAreWe/WhoAreWe";
import { getSlideInfo } from "@/utils/getSlideInfo";

// 1. Static Metadata for SEO - REMOVED BRACKETS AND CLEANED NAMES
export const metadata = {
  title: "BWDO | Brotherhood Welfare Development Organization - Bangladesh",
  description:
    "BWDO is a non-profit NGO in Bangladesh dedicated to education, health, and conservation. Join us to create lasting change through volunteerism and donations.",
  keywords: [
    "BWDO",
    "Brotherhood Welfare Development Organization",
    "NGO in Bangladesh",
    "Social Welfare Bangladesh",
    "Volunteer opportunities Bangladesh",
    "Donate to Education Bangladesh",
  ],
  alternates: {
    canonical: "https://www.bwdobd.com",
  },
  openGraph: {
    title: "Support BWDO | Brotherhood Welfare Development Organization",
    description:
      "Join our mission to empower underprivileged communities in Bangladesh.",
    url: "https://www.bwdobd.com",
    siteName: "BWDO Bangladesh",
    images: [
      {
        url: "/bwdo-social-share.png", // Tip: Rename your image to something descriptive like this
        width: 1200,
        height: 630,
        alt: "BWDO NGO Bangladesh Social Share",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BWDO - Brotherhood Welfare Development Organization",
    description:
      "Empowering lives and protecting the environment in Bangladesh.",
    images: ["/bwdo-social-share.png"],
  },
};

export default async function Home() {
  const slides = await getSlideInfo();

  // 2. Structured Data (JSON-LD) - USE ABSOLUTE PATHS
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Brotherhood Welfare Development Organization",
    alternateName: "BWDO",
    url: "https://www.bwdobd.com",
    logo: "https://www.bwdobd.com/logo.png", // Ensure this absolute URL is correct
    description:
      "A leading non-profit organization in Bangladesh focused on social welfare, health, and education.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801979438984",
      contactType: "customer service",
      areaServed: "BD",
      availableLanguage: ["Bengali", "English"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hidden H1 for SEO - Cleaned up the text */}
        <h1 className="sr-only">
          Brotherhood Welfare Development Organization (BWDO) - Leading Change
          in Bangladesh
        </h1>

        <Slider slides={slides} />
        <WhoAreWe />
        <FocusArea />
        <Volunteerism />
        <NewAndArticle />
      </main>
    </>
  );
}
