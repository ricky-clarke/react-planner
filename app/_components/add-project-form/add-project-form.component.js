 'use client'
 import { useState, useContext } from 'react';
 import globalContext from '@/app/_context/global-context';
import { usePathname, useRouter } from 'next/navigation';
import { collection, setDoc, doc, serverTimestamp  } from 'firebase/firestore';
import { db } from '@/src/firebase';
import {ProfileFormContainer } from './add-project-form.styles'
import generateRandomString from '@/app/_functions/random_string';

const AddProjectForm = ( props ) => {

    const {profile_id, profile_name} = props
    const router = useRouter();
    const prof_id = usePathname()
    const id = prof_id.replace('/','')

    const { state, dispatch } = useContext(globalContext);

    const randomString = generateRandomString(12);

    const [newProject, setNewProject] = useState({ 
        project_name: ' ',
    });

    // Add item to DB
    const CreateProject = async (e) => {

        e.preventDefault();

        if(newProject.project_name !== ' ')  {

                await setDoc(doc(collection(db, "profile"), profile_id, 'projects', randomString), {
                    project_name: newProject.project_name,
                    profile_name: profile_name,
                    timestamp: serverTimestamp()
                    });

                dispatch({type:"TASKOPEN", payload: false });
                dispatch({type:"TASKID", payload: ' '});

                router.push('/'+id+'/projects/'+randomString); // Redirect to project page

        }
    
    }

    //Cancel task button 
    const CancelCreateProject = () => {

        if(state.taskOpen === true) {
            dispatch({type:"TASKOPEN", payload: false });
            dispatch({type:"TASKID", payload: ' '});
        }
          
    }

    return (
        <>
                <ProfileFormContainer>
                    <form>
                    <h3>Add a project</h3>
                    <input type="text" placeholder="Project name" onChange={(e) => { setNewProject({...newProject, project_name: e.target.value}) }}/>
                    <button onClick={CreateProject} className='btn btn--submit'>Create project</button>
                    </form>
                    <div class="overlay" onClick={CancelCreateProject}></div>
                </ProfileFormContainer>
        </>
    )
}

export default AddProjectForm