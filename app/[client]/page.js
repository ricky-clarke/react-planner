'use client'
import { useEffect, useState, useContext, useRef } from 'react'
import { usePathname, useRouter  } from 'next/navigation'
import { collection, onSnapshot, query, doc, where, updateDoc, deleteDoc, setDoc, serverTimestamp  } from 'firebase/firestore';
import { db } from '@/src/firebase';
import globalContext from '@/app/_context/global-context';
import ProjectCard from '../_components/project-card/project-card.component';
import Layout from '../_components/layout/layout.component';
import { ClientDashboardGrid } from './client-dashboard.styles';
import { Card } from '../styles/card.styles';
import AddProjectForm from '../_components/add-project-form/add-project-form.component';
import Note from '../_components/note/note.component';
import Modal from '../_components/modal/modal.component';
import UpdateMessage from '../_components/update-message/update-message.component';
import { DeleteModal } from '../styles/delete-modal';
import generateRandomString from '@/app/_functions/random_string';
import { Editor } from '@tinymce/tinymce-react';
import ProjectHeader from '../_components/project-header/project-header.component';


export default function Page() {

  const editorRef = useRef(null);

  const text_api_key = `${process.env.NEXT_PUBLIC_TINYMCE}`;


  const router = useRouter();

const prof_id = usePathname()
const profile_id = prof_id.replace('/','')

const { state, dispatch } = useContext(globalContext);

const [profileInfo, getProfileInfo] = useState([ ]);

const [projects, getProjects] = useState([ ]);
const [closedProjects, getClosedProjects] = useState([ ]);
const [formStatus, formStatusHandler] = useState(false)

const [showProjects, showProjectsHandler ] = useState('Open');
const [editProfile, editProfileHandler ] = useState(false);

// notes
const [addNote, addNoteHandler ] = useState(false); // modal
const [newNote, newNoteHandler ] = useState({}); // Add note
const [getNotes, getNotesHandler] = useState(null); // Get notes
const [noteAdded, noteAddedHandler] = useState(false); // Add note message

// Delete profile warning
const [deleteTaskWarning, deleteTaskWarningHandler] = useState(false);

// Read profile projects from DB
useEffect ( () => {

  // Get Profile info from profile/Slug ID
  const unsub = onSnapshot(doc(db, "profile", profile_id), (doc) => {
    getProfileInfo(doc.data())
  });

  const get_open_projects = query(collection(db, 'profile', profile_id, 'projects'), where("project_status", "==", "Open"),)
  const snapshot = onSnapshot(get_open_projects, (querySnapshot) => {
      
      let itemsArr = []
      
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
        getProjects(itemsArr)
      });
      
  })

  const get_closed_projects = query(collection(db, 'profile', profile_id, 'projects'), where("project_status", "==", "Closed"),)
  const closed_project_snapshot = onSnapshot(get_closed_projects, (querySnapshot) => {
      
      let itemsArr = []
      
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
        getClosedProjects(itemsArr)
      });
      
  })

    
}, [])


// Get users
const [users, getUsers] = useState([]);
useEffect ( () => {

        const users_q = query(collection(db, 'admin_users'));
        
        const snapshot = onSnapshot(users_q, (querySnapshot) => {
            
            let itemsArr = []
  
            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                getUsers(itemsArr)
            });
  
        })

        return () => {
          snapshot();
        };
  
}, [])


const updateProfileChange = (event) => {
  const { name, value } = event.target;
  getProfileInfo((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

// Update profile
const updateProfile = (e) => {

    e.preventDefault();

    const updatedProfile = async () => {
      try {

        if (profileInfo.profile_name !== '' ||
        profileInfo.first_name !== '' ||
        profileInfo.last_name !== ''  ||
        profileInfo.email !== '' ||
        profileInfo.account_manager !== '')   {

          await updateDoc(doc(collection(db, "profile"), profile_id ), {
            profile_name: profileInfo.profile_name,
            first_name: profileInfo.first_name,
            last_name: profileInfo.last_name,
            email: profileInfo.email,
            account_manager: profileInfo.account_manager 
          });

          formStatusHandler(true)

          }

      }
      catch (e) {
        console.error(e);
    }

    }

    updatedProfile()
    formStatusHandler(false)

}

// Display add project form
const displayAddProjectForm = () => {

  if(state.modalOpen === false) {
      dispatch({type:"MODALOPEN", payload: true });
  }
  else {
    dispatch({type:"MODALOPEN", payload: false });
  }

  formStatusHandler(false)

}

const deleteProfile = (e) => {

  e.preventDefault

  const profileDeleted = async () => {

        // Delete task
        const docRef = doc(db, 'profile', profile_id);
        deleteDoc(docRef)
      
       // projectSettingsModalHandler(false)
        deleteTaskWarningHandler(false)
    
        router.push(`http://localhost:3000/dashboard`); 

  }

  profileDeleted()

}

const handleNoteInputChange = (event) => {
  const { name, value } = event.target;
  newNoteHandler((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

// Get notes
useEffect ( () => {

        const notes_q = query(collection(db, 'profile', profile_id, 'notes'))

        const snapshot = onSnapshot(notes_q, (querySnapshot) => {
          
            let itemsArr = []
  
            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                getNotesHandler(itemsArr)
            });
  
        })

        return () => {
          snapshot();
        };
  
  }, [])

// Add note to DB
const addNoteSubmit = (e) => {

      e.preventDefault();

      const noteAdded = async () => {

        if(newNote.title !== ' ' || 
        newNote.copy !== ' ')  {

          const randomString = generateRandomString(20);
  
              await setDoc(doc(collection(db, "profile"), profile_id, 'notes', randomString), {
                    title: newNote.title,
                    copy: newNote.copy,
                    publish_date: serverTimestamp()
              });

              noteAddedHandler(true)
  
        }
      }

      noteAdded()
      newNoteHandler({
        title : '',
        copy: ''
      })
      noteAddedHandler(false)
      
  
}

  
return (
    <>
       <Layout>

       <div className="flex justify-between items-end mb-[20px]">
          <ProjectHeader
            page_title={profileInfo.profile_name}
            profile_name="Dashboard"
          />    
          <div className='flex'>
            <button className='btn btn--submit float-right' onClick={() => {editProfileHandler(true)}}>Edit profile</button>
          </div>
      </div>

        <ClientDashboardGrid>

            <Card className='dashboard__projects'>
        
                <>
                  <div className='flex justify-between mb-3'>
                    <h2>Projects</h2>
                    <div className='flex gap-5 content-center'>
                      <button 
                      className={showProjects === 'Closed' ? 'opacity-80' : 'color--light-blue'}
                      onClick={() => {showProjectsHandler('Open')}}>Open</button>
                      <button 
                      className={showProjects === 'Open' ? 'opacity-80' : 'color--light-blue'}
                      onClick={() => {showProjectsHandler('Closed')}}>Closed</button>
                        <button className="btn btn--submit" onClick={displayAddProjectForm}>Create project</button>
                    </div>
                  </div>
                 
                  <div className='grid grid-cols-1 gap-4 mt-5'>
                      {showProjects == 'Open' && projects?.map((project, id) => (
                        <ProjectCard
                        key={id} 
                        profile_id={project.id}
                        title={project.project_name}
                        link_to = {`${profile_id}/projects/${project.id}`}
                        />
                        ))}

                      {showProjects == 'Closed' && closedProjects?.map((project, id) => (
                        <ProjectCard
                        key={id} 
                        profile_id={project.id}
                        title={project.project_name}
                        link_to = {`${profile_id}/projects/${project.id}`}
                        />
                        ))
                      }
                  </div>
                </>

            </Card>

            <Card>
         
              <h2 className='mb-3'>Account manager</h2>
              <p>{profileInfo.account_manager}</p>
              <br/>
              <h2 className='mb-3'>Main contact</h2>
              <p>{profileInfo.first_name} {profileInfo.last_name} - <a href={`mailto:${profileInfo.email}`}>{profileInfo.email}</a></p>
            </Card>

            <Card className='dashboard__notes'>
              <div className='flex justify-between items-center gap-4 mb-3'>
                <h2>Notes</h2>
                <div className='flex items-center gap-4'>
                  {/* <a href="">View all</a> */}
                  <div>
                    <button 
                    className='btn btn--submit float-right' 
                    onClick={() => {addNoteHandler(true), noteAddedHandler(false)}}>
                      Add note
                    </button>
                    </div>
                </div>
              </div>
                {getNotes?.map((note, id) => (
                    <Note key={id} {...note}/>
                ))}
            </Card>

        </ClientDashboardGrid>

          {state.modalOpen === true && <AddProjectForm profile_id={profile_id} profile_name={profileInfo.profile_name}/> }

          {editProfile && 
            <Modal>
                <div className='task__container'>
                        <div className='task__main'>
                            <div>
                                <h2>Edit profile</h2>
                                <form className="mt-5 flex flex-col gap-6" onSubmit={updateProfile}>
                                    <div>
                                      <h3 className='mb-3 font-bold'>Project name</h3>
                                      <input 
                                      type="text" 
                                      name="profile_name"
                                      defaultValue={profileInfo.profile_name}
                                      onChange={updateProfileChange}
                                      />
                                     </div>
                                    <div className='mt-6 mb-8'>
                                      <h3 className='mb-3 font-bold'>Contact info</h3>
                                      <div className='grid grid-cols-2 gap-5'>
                                        <div>
                                          <p className='mb-2'>First name</p>
                                          <input 
                                          type="text" 
                                          defaultValue={profileInfo.first_name}
                                          name="first_name"
                                          onChange={updateProfileChange}
                                          />
                                        </div>
                                        <div>
                                          <p className='mb-2'>Last name</p>
                                          <input type="text" 
                                          defaultValue={profileInfo.last_name}
                                          name="last_name"
                                          onChange={updateProfileChange}
                                          />
                                        </div>
                                        <div>
                                          <p className='mb-2'>Email</p>
                                          <input type="text" 
                                          defaultValue={profileInfo.email}
                                          name="email"
                                          onChange={updateProfileChange}
                                          />
                                        </div>

                                        <div className='col-start-1 col-end-2'>
                                        <p className='mb-3 font-bold'>Account manager</p>
                                        <select 
                                            onChange ={updateProfileChange}
                                            className ="mb-3"
                                            name="account_manager"
                                            defaultValue={profileInfo.account_manager}
                                            > 
                                            <option>-</option>
                                            {users.map((user, id) => (
                                                <option key={id} value={user.first_name + ' ' + user.last_name}>{user.first_name} {user.last_name}</option>
                                            ))}
                                        </select>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <button type="submit" className='btn btn--submit'>Update profile</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                              
                          <div className='task__meta'>
                              <div className='task__meta--top'></div>
                              <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={() => {deleteTaskWarningHandler(true)}}>Delete profile</button> 
                              </div>
                        </div>
                </div>
                {/* {formStatus &&
                
                  <div>
                      <p>updated</p>
                  </div>
                
                } */}
              
                <div className="overlay" onClick={() => {editProfileHandler(false)}}></div>
            </Modal>
          }

        {deleteTaskWarning && (
            <DeleteModal>
              <div>
                <h3>Delete Profile?</h3>
                <div>
                  <button
                    className="btn"
                    onClick={() => {deleteTaskWarningHandler(false) }}
                    >
                    Cancel
                  </button>
                  <form onSubmit={deleteProfile}>
                    <button type="submit" className="btn btn--cancel">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </DeleteModal>
        )}

        { addNote && 
          <Modal>
              <div className='task__container'>
                        <div className='task__main'>
                            <div>
                                <h2>Add note</h2>
                                <form className="mt-5 flex flex-col gap-6" onSubmit={addNoteSubmit}>
                                    <div>
                                      <label>Title</label>
                                      <input 
                                      type="text" 
                                      name="title"
                                      onChange={handleNoteInputChange}
                                      placeholder = 'Title'
                                      />
                                        <Editor
                                          apiKey={text_api_key}
                                          onInit={(evt, editor) => editorRef.current = editor}
                                          onChange={(e) => { newNoteHandler({...newNote, copy: editorRef.current.getContent()}) }}
                                          init={{
                                          height: 300,
                                          menubar: false,
                                          plugins: [
                                          'advlist','autolink', 'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','media','table','help','wordcount'
                                          ],
                                          toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                          'alignleft aligncenter alignright alignjustify | ' +
                                          'bullist numlist checklist | removeformat | a11ycheck code'
                                          }}
                                          />
                                      </div>
                                    <div>
                                      <button type="submit" className='btn btn--submit'>Create note</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                              
                          <div className='task__meta'>
                                  <div className='task__meta--top'></div>
                                  <div className='task__button--danger'>
                                    <button className='btn btn--cancel  mt-5' onClick={() => {addNoteHandler(false)}}>Cancel</button>
                                  </div>
                        </div>
                </div>
                <div className="overlay" onClick={() => {addNoteHandler(false)}}></div>
                {noteAdded && <UpdateMessage copy="Note created"/>}
          </Modal>
        }

      {formStatus && <UpdateMessage copy="Project updated"/>}

      </Layout>
    </>
  )
}