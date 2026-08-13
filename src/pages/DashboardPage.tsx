import { useState, useEffect } from "react";
import ProjectCard from "../components/project/ProjectCard";
import ProjectForm from "../components/project/ProjectForm";
import { projectsData } from "../data/projects";

interface Project {
  id: number;
  name: string;
  status: string;
}

const DashboardPage = () => {

  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3001/projects");

        if(!response.ok){
          throw new Error("Failed to fetch projects")
        }
        const data: Project[] = await response.json();

        setProjects(data);
      } catch (error) {
        setError("Something went wrong");
      }
      finally{
        
        setLoading(false);
      }

    };

    fetchProjects();
  }, []);

  const handleStatus = (id: number) => {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            status: "Completed",
          };
        }

        return project;
      }),
    );
  };

  const handleAddProject = (project: string) => {
    const newProject = {
      id: Date.now(),
      name: project,
      status: "Not Started",
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <>
      <h1>Dashboard</h1>
      <ProjectForm handleAddProject={handleAddProject} />

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          status={project.status}
          handleStatus={handleStatus}
          handleDeleteProject={handleDeleteProject}
        />
      ))}
    </>
  );
};

export default DashboardPage;
