import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";

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
  
  return (
    <>
      <h1>Dashboard</h1>
      {projects.map( project => (

        <ProjectCard 
          key={project.id} 
          id={project.id}
          name={project.name} 
          status={project.status} 
          handleStatus={handleStatus}
        />
      ))
      }
    </>
  );
};

export default DashboardPage;
