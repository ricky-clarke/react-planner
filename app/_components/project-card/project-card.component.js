import { useState, useEffect } from 'react'
import { ProjectRowContainer } from './project-card.styles'
import Link from 'next/link'

const ProjectCard = ( props ) => {

    const {title, profile_id, link_to} = props;

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    const [secondaryColor, secondaryColorHandler] = useState({
        secondary_color : '',
        secondary_font_color : '',
      })

    useEffect(() => {

          secondaryColorHandler({
            secondary_color : branding.secondary,
            secondary_font : branding.secondary_font,
        })
    
    }, [])

    const branding_colors = {
        secondary: {
            backgroundColor : secondaryColor.secondary_color, 
            color : secondaryColor.secondary_font,
        },

    };

    return (
        <>
           <ProjectRowContainer style={branding_colors.secondary} className="card">
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