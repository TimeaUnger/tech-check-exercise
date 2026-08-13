import { useParams } from "react-router-dom";
import {projectsData} from "../data/projects";
import ProjectHeadr from "../components/project/ProjectHeader";
import ProjectInfo from "../components/project/ProjectInfo";
import BackButton from "../components/common/BackButton";

const ProjectDetailsPage = () => {

    const { id } = useParams<{id: string}>();

    const project = projectsData.find((project) => project.id === Number(id));

    console.log(project)

    if(!project) {
        return <div>Project not found</div>
    }

    return (
        <>  
            <BackButton />
            <ProjectHeadr project={project}/>
            <ProjectInfo project={project} />
        </>
    )

}

export default ProjectDetailsPage;