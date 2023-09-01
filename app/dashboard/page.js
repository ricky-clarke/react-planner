'use client'
import { useState, useEffect, useContext } from 'react';
import globalContext from "@/app/_context/global-context"
import { collection, querySnapshot, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/src/firebase';
import { ClientDashboardGrid } from '../[client]/client-dashboard.styles';
import ProfileCard from '../_components/project-card/project-card.component';
import { Card } from '../styles/card.styles';
import Layout from '../_components/layout/layout.component';
import AddUserForm from '../_components/add-user-form/add-user-form.component';

export default function Dashboard() {

  const { state, dispatch } = useContext(globalContext);
  const [projects, setProjects] = useState([]);
  const [users, getUsers] = useState([]);

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

    useEffect ( () => {

      const users_q = query(collection(db, 'admin_users'));
      
      const snapshot = onSnapshot(users_q, (querySnapshot) => {
          
          let itemsArr = []

          querySnapshot.forEach((doc) => {
              itemsArr.push({...doc.data(), id: doc.id})
              getUsers(itemsArr)
          });

      })

  }, [])

    const addNewProfile = () => {

      if(state.newProfileModal === false) {
          dispatch({type:"NEWPROFILEOPEN", payload: true });
      }
  }

  const addUser = () => {
      dispatch({type:"NEWUSEROPEN", payload: true });
  }


  const [primaryColor, primayColorHandle] = useState({
    primary_color : '',
    primary_font_color : '',
    accent_color: ''
  })

  useEffect(() => {

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    primayColorHandle({
      button_bg_color : branding.button_bg_color,
      button_font_color : branding.button_font_color,
      accent_color : branding.accent_color,
    })

  }, [])

  const branding = {
    button : {
      backgroundColor: primaryColor.button_bg_color, 
      color: primaryColor.button_font_color,
    },
    card_container : {
      borderColor: primaryColor.accent_color, 
    },
  };



  return (
    <Layout>
        <h1 className='mb-[20px]'>Dashboard</h1>       
        <ClientDashboardGrid>

          <Card className='card_container' style={branding.card_container}>
              <>
                <div className='flex justify-between mb-3'>
                  <h2>Profiles</h2>
                  <div className='flex gap-5 content-center'>
                  <button 
                  className="btn btn--submit" 
                  onClick={addNewProfile}
                  style={branding.button}>Create profile</button>
                  </div>
                </div>
              
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    {projects.map((project, id) => (
                      <ProfileCard
                      key={id} 
                      profile_id={project.id}
                      title={project.profile_name}
                      />
                    ))}
                </div>
              </>

          </Card>

          <Card className='card_container' style={branding.card_container}>
            <button
            onClick={addUser}
            className='btn btn--submit float-right'
            style={branding.button}>Add a user</button>

            <h2 className='mb-3'>People</h2>
                {users.map((user, id) => (
                    <div key={id} className='mb-2'>
                      <p>{user.first_name} {user.last_name}</p>
                    </div>
                  ))}
          </Card>
        </ClientDashboardGrid>

        {state.newUserModal === true && <AddUserForm /> }

    </Layout>
  )
}
