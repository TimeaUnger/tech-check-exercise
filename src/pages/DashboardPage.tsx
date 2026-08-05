import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";
import ProjectForm from "../components/project/ProjectForm";

const projectsData = [
  {
    id: 1,
    name: "React Migration",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Completed",
  },
  {
    id: 3,
    name: "CRM System",
    status: "Not Started",
  },
  {
    id: 4,
    name: "E-commerce Platform",
    status: "In Progress",
  },
];

interface Project {
  id: number;
  name: string;
  status: string;
}


const DashboardPage = () => {

  const [projects, setProjects] = useState<Project[]>(projectsData);


  const handleStatus = (id: number) => {

    setProjects(
      projects.map(project => {
        if (project.id === id){
          return {
            ...project,
            status: "Completed"
          }
        }

        return project;
      })
    )
  }

  const handleAddProject = (project: string) => {

    const newProject = {
      id: Date.now(),
      name: project,
      status: "Not Started"
    }

    setProjects([
      ...projects,
      newProject
    ])
  }

  const handleDeleteProject = (id: number) => {

    setProjects(
      projects.filter((project) => project.id !== id)
    )
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ProjectForm handleAddProject={handleAddProject} />

      {projects.map( project => (

        <ProjectCard 
          key={project.id} 
          id={project.id}
          name={project.name} 
          status={project.status} 
          handleStatus={handleStatus}
          handleDeleteProject={handleDeleteProject}
        />
      ))
      }
    </>
  );
};

export default DashboardPage;
