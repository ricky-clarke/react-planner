'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ProjectHeaderContainer } from "./project-header.styles";

const ProjectHeader= (props) => {

    const { page_title, profile_name, project_id , project_status} = props;

        const prof_id = usePathname()
        const parts = prof_id.split('/');
        const profile_id = parts[1];

    return (
        <>

            <ProjectHeaderContainer>
                <p className="sub_heading"><Link href={`/${profile_id}`}>{profile_name}</Link></p>
                <div className="flex justify-between align-center">
                <h1 className="pr-5 mb-0">{page_title} {project_status == 'Closed' && <span>(Closed)</span>}</h1>
                </div>
            </ProjectHeaderContainer>
           
        </>
    )
}

export default ProjectHeader