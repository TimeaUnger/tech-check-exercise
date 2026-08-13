import type { Project } from "../../data/projects";

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </>
  );
};

export default ProjectHeader;
