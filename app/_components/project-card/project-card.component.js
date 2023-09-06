import { ProjectRowContainer } from './project-card.styles'
import Link from 'next/link'

const ProjectCard = ( props ) => {

    const {title, profile_id, link_to} = props;

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    const branding_colors = {
        secondary: {
            backgroundColor : branding.secondary_bg, 
            color : branding.secondary_font,
        },
    };

    return (
        <>
           <ProjectRowContainer className="card" style={branding_colors.secondary} >
                <div className='flex justify-between gap-3'>
                    <div className='grow relative'>
                        <h3>{title}</h3>
                        { link_to ? <Link href={`${link_to}`} aria-label='View Project'></Link> : 
                        <Link href={`${profile_id}`} aria-label='View Profile'></Link> }
                    </div>
                </div>
           </ProjectRowContainer>
        </>
    )
}

export default ProjectCard