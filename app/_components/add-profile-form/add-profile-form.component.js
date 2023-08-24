import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import globalContext from '@/app/_context/global-context';
import { collection, doc, setDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '@/src/firebase';
import { Modal } from '@/app/styles/modal.styles';

const AddProfileForm = () => {

    const router = useRouter();

    const { state, dispatch } = useContext(globalContext);

    const [newProfile, setNewProfile] = useState({ 
        company_name: ' ',
        first_name: ' ',
        last_name: ' ',
        email: ' ' ,
    });

    // Add item to DB
    const CreateProfile = async (e) => {

        e.preventDefault();

        if (
        newProfile.company_name !== ' ' || 
        newProfile.first_name !== ' '  ||
        newProfile.last_name !== ' ' ||
        newProfile.email !== ' ')  {

            // Add the doc to the profile collection
            await setDoc(doc(collection(db, "profile")), {
                company_name: newProfile.company_name.trim(),
                first_name: newProfile.first_name,
                last_name: newProfile.last_name,
                email: newProfile.email,
                timestamp: serverTimestamp() 
            });
               
            // Clear form values once submitted
            setNewProfile( {
                company_name: ' ',
                first_name: ' ',
                last_name: ' ',
                email: ' ',
            })

            dispatch({type:"NEWPROFILEOPEN", payload: false });

            // Redirect to the specified route
            router.push('/dashboard'); 

        }
    
    }

    // Cancel  add new profile 
    const CancelCreateProfile = () => {

        if(state.newProfileModal === true) {
            dispatch({type:"NEWPROFILEOPEN", payload: false });
        }
            
    }

    return (
        <>
            <Modal>
               
                <form>
                    <h2>Add a profile</h2>
                    <input type="text"
                    placeholder="Company name"
                    onChange={(e) => { setNewProfile({...newProfile, company_name: e.target.value}) }}/>
                    <input
                    type="text"
                    placeholder="First name"
                    onChange={(e) => { setNewProfile({...newProfile, first_name: e.target.value}) }}/>
                    <input
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => { setNewProfile({...newProfile, last_name: e.target.value}) }}/>
                    <input
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => { setNewProfile({...newProfile, email: e.target.value}) }}/> 
                    <button
                    onClick={CreateProfile}className='btn btn--submit'>Create profile</button>
                    <button
                    onClick={CancelCreateProfile}className='btn'>Cancel</button>
                </form>
                <div class="overlay" onClick={CancelCreateProfile}></div>
            </Modal>
        </>
    )
}

export default AddProfileForm