import { useState, useEffect } from 'react';
import {  collection,  onSnapshot,  query } from 'firebase/firestore';
import { db } from '@/src/firebase';

const TaskCardComment = (props) => {

    const {profile_id, project_id, task_id} = props

    const [taskComments, taskCommentsHandler] = useState({})

        // Read all tasks from DB
        useEffect ( () => {

            // On hold
            const task_comment_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks', task_id, 'comments'), )
            
            const shapshot = onSnapshot(task_comment_q, (querySnapshot) => {
                
                let itemsArr = []
    
                querySnapshot.forEach((doc) => {
                    itemsArr.push({...doc.data(), id: doc.id})
                    taskCommentsHandler(itemsArr)
                });
    
            })
    
            return () => {
                shapshot();
              };
    
        }, [])

    return (
        <>
            <p></p>
            <span>{taskComments.length > 0 ? taskComments.length : '0'}</span>
            
        </>
    )
}

export default TaskCardComment