interface ProjectCardProps {
    id: number;
    name: string;
    status: string;
    handleStatus: (id: number) => void;
}

const ProjectCard = ({id, name, status, handleStatus}: ProjectCardProps) => {

  const isCompleted = status === "Completed";
  
  const handleClick = () => {
    handleStatus(id);
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
    </>
  );
};

export default ProjectCard;
