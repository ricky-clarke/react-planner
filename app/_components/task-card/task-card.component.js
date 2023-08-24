'use client'
import { useEffect, useContext, useState } from "react";
import { collection, doc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/firebase';
import {globalContext } from "@/app/_context/global-context";
import CommentIcon from "@/app/_svgs/comment";
import { TaskCardStyle, TaskCardMeta, TaskCardOpen } from "./task-card.styles";

const TaskCard = (props) => {

    const { taskName, task_id, profile_id, project_id } = props;
    const { state, dispatch } = useContext(globalContext);
    const [taskInfo, taskInfoHandler] = useState([]);
    
    const openTask = () => {

        if(state.taskOpen === false) {
            dispatch({type:"TASKOPEN", payload: true });
            dispatch({type:"TASKID", payload: task_id});
        }

    }

    // Get card data
    useEffect ( () => {

        // On hold
        const q = query(
            collection(db, 
            'profile', profile_id, 
            'projects', project_id,
            'tasks', task_id,
            'comments'))

        const shapshot = onSnapshot(q, (querySnapshot) => {
            
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                taskInfoHandler(itemsArr)
            });

        })

    }, [])


    return (
        <>
            <TaskCardStyle id={task_id}>
              <h3>{taskName}</h3>
             <TaskCardMeta>
                <p>date <span><CommentIcon /> {taskInfo.length}</span></p>
                <p>IMG</p>
                {/* {new Date(taskInfo.timestamp)} */}
                {/* <p className="m-0">{taskAssigned ? taskAssigned : 'Unassigned' }</p> */}
            </TaskCardMeta>
              <TaskCardOpen onClick={openTask}></TaskCardOpen>
            </TaskCardStyle>
        </>
    )
}

export default TaskCard