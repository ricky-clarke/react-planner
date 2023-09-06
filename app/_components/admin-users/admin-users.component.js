'use client'
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/src/firebase';

const AdminUsers = () => {

    const [adminUsers, adminUsersHandler] = useState([])

    useEffect ( () => {

            const adminusers_q = query(collection(db, 'admin_users'), )
            
            const shapshot = onSnapshot(adminusers_q, (querySnapshot) => {
                
                let itemsArr = []
    
                querySnapshot.forEach((doc) => {
                    itemsArr.push({...doc.data(), id: doc.id})
                    adminUsersHandler(itemsArr)
                });
    
            })
    
            return () => {
                shapshot();
              };
    
    }, [])

    return (
        <>
            {
                adminUsers?.map((user, i) => (
                <option 
                    key={i}
                    value={user. first_name + ' ' + user. last_name}>
                    {user. first_name + ' ' + user. last_name}
                </option>
            )   )  
             }
        </>
    )
}

export default AdminUsers