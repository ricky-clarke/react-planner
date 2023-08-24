import { ProfileRowContainer } from './profile-card.styles'
import Link from 'next/link'

const ProfileCard = ( props ) => {

    const {title, profile_id, link_to} = props

    return (
        <>
           <ProfileRowContainer>
                <h3>{title}</h3>
               {
               link_to ? <Link href={`${link_to}`} aria-label='View Project'></Link> : 
               <Link href={`${profile_id}`} aria-label='View Profile'></Link> }
           </ProfileRowContainer>
        </>
    )
}

export default ProfileCard