'use client'
import { useState, useEffect } from 'react';
import { collection, querySnapshot, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/src/firebase';
import ProfileCard from '../_components/profile-card/profile-card.component';
import Layout from '../_components/layout/layout.component';

export default function Dashboard() {

  const [projects, setProjects] = useState([ ]);

    // Read profiles from DB
      useEffect ( () => {

        const get_projects_q = query(collection(db, 'profile'));
        
        const snapshot = onSnapshot(get_projects_q, (querySnapshot) => {
            
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                setProjects(itemsArr)
            });

        })

    }, [])

  return (
    <Layout>
        <div className='w-3/6'>
          <h1>Dashboard</h1>
          <p>Profile list</p>
          <div className='profile_list mt-4'>
              {projects.map((project, id) => (
                <ProfileCard
                key={id} 
                profile_id={project.id}
                title={project.company_name}
                />
                ))}
            </div>
        </div>
    </Layout>
  )
}
