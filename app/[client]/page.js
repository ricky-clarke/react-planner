'use client'
import { useEffect, useState, useContext } from 'react'
import { usePathname  } from 'next/navigation'
import { collection, onSnapshot, query, getDocs, doc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import globalContext from '@/app/_context/global-context';
import Navigation from "../_components/navigation/navigation.component"
import AddProjectForm from "../_components/add-project-form/add-project-form.component"
import ProfileCard from '../_components/profile-card/profile-card.component';
import { ClientDashboardGrid, ClientProjectList } from './client-dashboard.styles';
import Layout from '../_components/layout/layout.component';

export default function Page() {

const prof_id = usePathname()
const profile_id = prof_id.replace('/','')

const { state, dispatch } = useContext(globalContext);

const [profileInfo, getProfileInfo] = useState([ ]);
const [projects, getProjects] = useState([ ]);

// Read profiles from DB
useEffect ( () => {

  // Get Profile info from profile/Slug ID
  const unsub = onSnapshot(doc(db, "profile", profile_id), (doc) => {
    getProfileInfo(doc.data())
  });

  const get_projects_q = query(collection(db, 'profile', profile_id, 'projects' ));    
    
  const snapshot = onSnapshot(get_projects_q, (querySnapshot) => {
      
      let itemsArr = []
      
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
        getProjects(itemsArr)
      });
      
    })
    
}, [])

const {company_name, first_name, last_name, email} = profileInfo

// Display ad project form
const displayAddProjectForm = () => {

    if(state.taskOpen === false) {
        dispatch({type:"TASKOPEN", payload: true });
    }

}
  
  return (
    <>
       <Layout>

        <h1>{company_name} dashboard</h1>

        <ClientDashboardGrid>

            <ClientProjectList>
              { projects != 0 &&
                <>
                  <h2>Ongoing projects</h2>
                  <div className='grid grid-cols-1 gap-4'>
                      {projects.map((project, id) => (
                        <ProfileCard
                        key={id} 
                        profile_id={project.id}
                        title={project.project_name}
                        link_to = {`${profile_id}/projects/${project.id}`}
                        />
                        ))}
                  </div>
                  </>
              }
              
              <button className="btn btn--submit mt-5" onClick={displayAddProjectForm}>Create project</button>

            </ClientProjectList>

            <div className='dashboard__profile_info'>
              <h2>Profile information</h2>
              <h3 className='mb-3'><b>{company_name}</b></h3>
              <p className='mb-2'>Main point of contact</p>
              <p>{first_name} {last_name}</p>
              <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
          </ClientDashboardGrid>

        {state.taskOpen === true && <AddProjectForm profile_id={profile_id} profile_name={company_name} /> }

      </Layout>
    </>
  )
}