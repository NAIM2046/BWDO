import ProjectDetail from "@/components/projectdetail/ProjectDetail";
import getsingleProject from "@/utils/getsingleProject";






export default async function ProjectDetailPage({params}) {

  const { id } = await params; 
  const projectData = await getsingleProject(id);
  
  

  return (
    <div>

      <ProjectDetail projectData={projectData}></ProjectDetail>
    </div>
  );
}