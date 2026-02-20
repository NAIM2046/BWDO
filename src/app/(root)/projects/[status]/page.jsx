import getprojectinfo from "@/utils/getprojectinfo";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { status } = await params;

  // প্রথম অক্ষর বড় হাতের করার জন্য (যেমন: ongoing -> Ongoing)
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return {
    title: `${displayStatus} Projects | BWDO`,
    description: `Explore our ${status} community development projects. BWDO is committed to positive social change through various initiatives.`,
    openGraph: {
      title: `${displayStatus} Projects - Brotherhood Welfare and Development Organization`,
      description: `Check out our latest ${status} projects and their impact on society.`,
    },
  };
}
export default async function ProjectPage({ params }) {
  const { status } = await params;

  console.log(status);

  // Example Data (Later you can fetch from your backend)
  const projects = await getprojectinfo();

  //console.log("hello ...........",projects);

  // Filter by route param
  const filteredProjects = projects?.filter((p) => p.status === status);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${status} Projects`,
    numberOfItems: filteredProjects?.length || 0,
    itemListElement: filteredProjects?.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `https://yourdomain.com/project-details/${project._id}`,
    })),
  };

  if (filteredProjects?.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        No {status} projects found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold mb-6 capitalize text-center text-blue-500">
        {status} Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <div
            key={project._id}
            className="border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 bg-white"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Category: {project.category}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                {project.description.substring(0, 120)}...
              </p>
              <Link
                href={`/project-details/${project._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
