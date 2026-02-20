import ProjectDetail from "@/components/projectdetail/ProjectDetail";
import getsingleProject from "@/utils/getsingleProject";

// ১. ডাইনামিক মেটাডেটা জেনারেটর
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getsingleProject(id);

  // যদি প্রজেক্ট না পাওয়া যায়
  if (!project) {
    return {
      title: "Project Not Found | BWDO",
      description: "The project you are looking for does not exist.",
    };
  }

  return {
    title: `${project.title} | BWDO Projects`, // প্রজেক্টের নাম অনুযায়ী টাইটেল
    description:
      project.description?.substring(0, 160) ||
      "Learn more about our impactful projects at BWDO.", // বর্ণনা
    openGraph: {
      title: project.title,
      description: project.description?.substring(0, 160),
      images: [
        {
          url: project.image || "/default-project-image.jpg", // প্রজেক্টের ছবি
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const projectData = await getsingleProject(id);

  // ২. স্ট্রাকচারড ডাটা (JSON-LD) - এটি গুগলকে প্রজেক্ট সম্পর্কে বিস্তারিত তথ্য দেয়
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork", // বা "Event" যদি এটি কোনো ইভেন্ট হয়
    name: projectData?.title,
    description: projectData?.description,
    image: projectData?.image,
    author: {
      "@type": "Organization",
      name: "BWDO",
    },
  };

  return (
    <main>
      {" "}
      {/* সেমান্টিক ট্যাগ ব্যবহারের জন্য মেইন দেওয়া ভালো */}
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail projectData={projectData} />
    </main>
  );
}
