import ProjectCard from "@/features/projects/components/ProjectCard";
import { type Project } from "@/features/projects/types/project";
import { useWorkspaceStore } from "../stores/useWorkspaceStore";

function ProjectTab() {
  const { projects, searches } = useWorkspaceStore();

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes((searches.projects || "").toLowerCase())
  );

  const handleClick = (project: Project) => {
    console.log("Clicked project with ID:", project);
  };
  return (
    <div>
      {filteredProjects.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No projects created in this workspace.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              {...proj}
              onClick={() => handleClick(proj)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectTab;
