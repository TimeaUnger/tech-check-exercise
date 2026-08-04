interface ProjectCardProps {
    name: string;
    status: string;
}

const ProjectCard = ({name, status}: ProjectCardProps) => {
  return (
    <>
      <h2>{name}</h2>
      <p>{status}</p>
    </>
  );
};

export default ProjectCard;
