import ProjectCard from "../components/project/ProjectCard";
const projects = [
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

const DashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>
      {projects.map( project => (

        <ProjectCard key={project.id} name={project.name} status={project.status} />
      ))
      }
    </>
  );
};

export default DashboardPage;
