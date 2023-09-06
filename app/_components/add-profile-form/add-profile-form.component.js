import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import globalContext from '@/app/_context/global-context';
import { collection, doc, setDoc, query, onSnapshot, serverTimestamp} from 'firebase/firestore';
import { db } from '@/src/firebase';
import Modal from '../modal/modal.component';

const AddProfileForm = () => {

    const router = useRouter();

    const { state, dispatch } = useContext(globalContext);
    const [newProfile, setNewProfile] = useState({});

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
  
    }, [])

    // Add form values to state onChange
    const addUserInputChange = (event) => {
        const { name, value } = event.target;
        setNewProfile((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Add item to DB
    const CreateProfile = (e) => {

        e.preventDefault();

        const Addprofile = async () => { 

            if(newProfile.profile_name != '' ||
            newProfile.first_name != '' ||
            newProfile.last_name != '' ||
            newProfile.email != '' ||
            newProfile.account_manager != '') {
    
                // Add the doc to the profile collection
                await setDoc(doc(collection(db, "profile")), {
                    profile_name: newProfile.profile_name,
                    first_name: newProfile.first_name,
                    last_name: newProfile.last_name,
                    email: newProfile.email,
                    account_manager: newProfile.account_manager,
                    timestamp: serverTimestamp() 
                });
                   
                dispatch({type:"NEWPROFILEOPEN", payload: false });
    
                // Redirect to the specified route
                router.push('/dashboard'); 
    
            }

        }

        Addprofile()

    }

    // Cancel add new profile 
    const CancelCreateProfile = () => {

        if(state.newProfileModal === true) {
            dispatch({type:"NEWPROFILEOPEN", payload: false });
        }
            
    }

    return (
            <Modal>
                    <div className='task__container'>
                        <div className='task__main'>
                            <div>
                                <h2>Create a profile</h2>
                                <form className="mt-4" onSubmit={CreateProfile}>
                                <input type="text"
                                placeholder="Profile/company name"
                                name="profile_name"
                                onChange={addUserInputChange}
                                />
                                <input
                                type="text"
                                name="first_name"
                                placeholder="First name"
                                onChange={addUserInputChange}
                                />
                                <input
                                type="text"
                                name="last_name"
                                placeholder="Last name"
                                onChange={addUserInputChange}
                                />
                                <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                onChange={addUserInputChange}
                                required
                                /> 
                                <hr className='mt-8 pb-5' />
                                <p className='my-4'>Account manager</p>
                                <select 
                                    onChange ={addUserInputChange}
                                    className ="mb-3"
                                    name="account_manager"
                                    > 
                                    <option>-</option>
                                    {users.map((user, id) => (
                                        <option key={id} value={user.first_name + ' ' + user.last_name}>{user.first_name} {user.last_name}</option>
                                    ))}
                                </select>
                            
                                <div className='flex mt-8 gap-5'>
                                    <button type="submit"
                                    className='btn btn--submit'>Create profile</button>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className='task__meta'>
                            <div></div>
                            <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={CancelCreateProfile}>Cancel</button>
                            </div>
                        </div>
                    </div>
                <div className="overlay" onClick={CancelCreateProfile}></div>
            </Modal>

    )
}

export default AddProfileForm