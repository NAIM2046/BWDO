import getprojectinfo from "@/utils/getprojectinfo";
import Link from "next/link";


export default async function ProjectPage({ params }) {
  const { status } = await params;

  console.log(status)

  // Example Data (Later you can fetch from your backend)
  const projects = await getprojectinfo();

  //console.log("hello ...........",projects);

  // Filter by route param
  const filteredProjects = projects?.filter((p) => p.status === status);

  if (filteredProjects?.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        No {status} projects found.
      </div>
    );
  }

  return (
    <div className="p-6">
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
              <h2 className="text-xl font-semibold mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Category: {project.category}
              </p>
              <p className="text-gray-700 text-sm mb-4">
               {project.description.substring(0, 120)}...
              </p>
              <Link href={`/project-details/${project._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
