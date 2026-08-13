import type { Project } from "../../data/projects";
import InfoItem from "./InfoItem";

interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <>
      <InfoItem label="Status" value={project.status} />
      <InfoItem label="Owner" value={project.owner} />
      <InfoItem label="Priority" value={project.priority} />
      <InfoItem label="Deadline" value={project.deadline} />
    </>
  );
};

export default ProjectInfo;
