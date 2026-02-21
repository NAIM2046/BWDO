import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { icons } from "lucide-react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://bwdobd.com'),
  title: {
    default: "BWDO | Brotherhood Welfare Development Organization",
    template: "%s | BWDO"
  },
  description: "Brotherhood Welfare Development Organization (BWDO) is a dedicated non-profit organization working for social justice, poverty alleviation, and community empowerment in Bangladesh. Join us to build a better future together.",
  keywords: ["BWDO", "Brotherhood Welfare Development Organization", "Social Welfare Bangladesh", "Non-profit Organization", "Community Development"],
  icons: {
    icon: "/favicon.png", 
  },
  openGraph: {
    title: "Brotherhood Welfare Development Organization - BWDO",
    description: "Empowering communities and fostering social welfare through sustainable development projects. Explore our mission and join our journey.",
    url: "https://bwdobd.com",
    siteName: "BWDO",
    images: [
      {
        url: "/FB_IMG_1760359831083-removebg-preview.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
