 'use client'
 import { useState, useContext } from 'react';
 import globalContext from '@/app/_context/global-context';
import { usePathname, useRouter } from 'next/navigation';
import { collection, setDoc, doc, serverTimestamp  } from 'firebase/firestore';
import { db } from '@/src/firebase';
import generateRandomString from '@/app/_functions/random_string';
import Modal from '../modal/modal.component';

const AddProjectForm = ( props ) => {

    const {profile_id, profile_name} = props

    const router = useRouter();
    const prof_id = usePathname()
    const id = prof_id.replace('/','')

    const {state, dispatch } = useContext(globalContext);

    const randomString = generateRandomString(12);

    const [cancelCreate, cancelCreateHandler] = useState(true);

    const [newProject, setNewProject] = useState({ 
        profile_name: profile_name,
        project_name: '',
        project_status: 'Open',
        published_date: serverTimestamp()
    });

    // Add item to DB
    const CreateProject = async (e) => {

        e.preventDefault();

        if(newProject.project_name !== ' ')  {

                await setDoc(doc(collection(db, "profile"), profile_id, 'projects', randomString), {
                    profile_name: newProject.profile_name,
                    project_name: newProject.project_name,
                    project_status : newProject.project_status,
                    published_date:  newProject.published_date,
                    });

                router.push('/'+id+'/projects/'+randomString); // Redirect to project page
                dispatch({type:"MODALOPEN", payload: false });

        }
    
    }

    //Cancel create project button 
    const CancelCreateProject = () => {

        if(state.modalOpen === false) {
            dispatch({type:"MODALOPEN", payload: true });
        }
        else {
          dispatch({type:"MODALOPEN", payload: false });
        }
          
    }

    return (
        <>

          {state.modalOpen === true &&

            <Modal>
                <div className='task__container'>
                     <div className='task__main'>
                            <div>{profile_name}
                                <h2>Add a project</h2>
                                <form className="mt-4">
                                    <p className='label'><label>Project name</label></p>
                                    <input type="text" placeholder="Project name" onChange={(e) => { setNewProject({...newProject, project_name: e.target.value}) }}/>
                                    <div className="flex gap-5 mt-5">
                                        <button onClick={CreateProject} className='btn btn--submit'>Create project</button>
                                    </div>
                              </form>
                            </div>
                    </div>   
                    <div className='task__meta'>
                        <div></div>
                        <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={CancelCreateProject}>Cancel</button>
                            </div>
                    </div>
                </div>
                <div className="overlay" onClick={CancelCreateProject}></div>
                </Modal>

            }

        </>
    )
}

export default AddProjectForm