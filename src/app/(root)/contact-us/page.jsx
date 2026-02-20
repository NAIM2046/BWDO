import ContactUs from "@/components/ContactUs/ContactUs";

export const metadata = {
  title: "Contact Us | Brotherhood Welfare Development Organization - BWDO",
  description:
    "Get in touch with BWDO. Visit our Dhaka office, call us, or send an email to learn more about our social welfare projects in Bangladesh.",
  keywords: [
    "Contact BWDO",
    "NGO office Dhaka",
    "Volunteer in Bangladesh",
    "Donate to BWDO",
  ],
  alternates: {
    canonical: "https://www.bwdobd.com/contact-us",
  },
};

const ContactUsPage = () => {
  // ৩. স্ট্রাকচারড ডাটা (JSON-LD) - Local Business Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "BWDO",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ambagan gate, Jahangirnagar University, Savar, Dhaka",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    telephone: "+8801979438984",
    email: "officialbrotherhood2016@gmail.com",
    url: "https://www.bwdobd.com/contact-us",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <ContactUs />
      </main>
    </>
  );
};

export default ContactUsPage;
