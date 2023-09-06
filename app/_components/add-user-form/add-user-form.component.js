import { useState, useContext } from 'react';
import globalContext from '@/app/_context/global-context';
import { collection, doc, setDoc, serverTimestamp} from 'firebase/firestore';
 import { db } from '@/src/firebase';
import Modal from '../modal/modal.component';
import UpdateMessage from '../update-message/update-message.component';

const AddUserForm = () => {

    const [newUser, setNewUser] = useState({});
    const { dispatch } = useContext(globalContext);
    const [userAddedMessage, userAddedMessageHandler] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    // Add item to DB
    const CreateUser = (e) => {

        e.preventDefault();

        const createdUser = async () => { 

            try {
                    if (
                        newUser.first_name !== ' '  ||
                        newUser.last_name !== ' ' ||
                        newUser.email !== ' ')  {

                        // Add the doc to the profile collection
                        await setDoc(doc(collection(db, "admin_users")), {
                            first_name: newUser.first_name,
                            last_name: newUser.last_name,
                            email: newUser.email,
                            timestamp: serverTimestamp() 
                        });

                        dispatch({type:"NEWUSEROPEN", payload: false });
                        userAddedMessageHandler(true)
                    }
    
            }
            catch {
            }

        }

        createdUser()
    }

    // Cancel add new user
    const CancelUserCreate = () => {
        dispatch({type:"NEWUSEROPEN", payload: false });
    }

    return (
        <>
            <Modal>
            <div className='task__container'>
                <div className='task__main'>
                    <div>
                        <form>
                            <h2>Add a user</h2>
                            <input
                            type="text"
                            name = "first_name"
                            placeholder="First name"
                            onChange={handleInputChange}/>
                            <input
                            type="text"
                            name = "last_name"
                            placeholder="Last name"
                            onChange={handleInputChange}/>
                            <input
                            type="email"
                            name = "email"
                            placeholder="Email address"
                            onChange={handleInputChange}/> 
                            <div className='flex mt-3 gap-5'>
                                <button
                                onClick={CreateUser}className='btn btn--submit'>Create User</button>
                                <button
                                onClick={CancelUserCreate}className='btn'>Cancel</button> 
                            </div>
                        </form>
                    </div>
                </div>

                <div className='task__meta'>
                    <div></div>
                    <div className='task__button--danger'>
                        <button className="btn btn--cancel mt-5" onClick={CancelUserCreate}>Cancel</button>
                    </div>
                </div>

            </div>
                <div className="overlay" onClick={CancelUserCreate}></div>
                {userAddedMessage &&<UpdateMessage copy="User added" /> }
            </Modal>
        </>
    )
}

export default AddUserForm