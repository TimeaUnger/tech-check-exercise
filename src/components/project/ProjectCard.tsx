interface ProjectCardProps {
    id: number;
    name: string;
    status: string;
    handleStatus: (id: number) => void;
    handleDeleteProject: (id: number) => void
}

const ProjectCard = ({
    id, 
    name, 
    status, 
    handleStatus, 
    handleDeleteProject
  }: ProjectCardProps) => {

  const isCompleted = status === "Completed";
  
  const handleClick = () => {
    handleStatus(id);
  }

  const handleDelete = () => {
    handleDeleteProject(id);
  }

  return (
    <>
      <h2>{name}</h2>
      <p>{status}</p>
      <button 
        onClick={handleClick} 
        disabled={isCompleted}
      >
        Set complete
      </button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default ProjectCard;
