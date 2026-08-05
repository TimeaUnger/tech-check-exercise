import { useState } from "react";

interface ProjectFormProps {
    handleAddProject: (project: string) => void;
}

const ProjectForm = ({handleAddProject}: ProjectFormProps) => {

    const [projectName, setProjectName] = useState("")

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!projectName.trim()) return;

        handleAddProject(projectName.trim());
        setProjectName("")

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.currentTarget.value);
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
            name="projectName" 
            value={projectName} 
            onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default ProjectForm;
