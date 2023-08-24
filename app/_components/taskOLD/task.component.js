'use client'
import { useContext , useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { doc, getDoc, deleteDoc, serverTimestamp, collection, setDoc, query, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import globalContext from '@/app/_context/global-context';
import { TaskPopOut, DeleteTaskWarning, CommentList } from '@/app/styles/task.styles';
import Comment from '../comment/comment.component';
import { Editor } from '@tinymce/tinymce-react';
import generateRandomString from '@/app/_functions/random_string';
import PencilIcon from '@/app/_svgs/pencil';
import CommentIcon from '@/app/_svgs/comment';

const TaskCardEdit = (props) => {

    const editorRef = useRef(null);

    const { state, dispatch } = useContext(globalContext);
    const {project_id } = props

    const [taskInfo, taskInfoHandler] = useState([]);
    const [deleteTaskWarning, DeleteTaskWarningHandler] = useState(false);

    const [newComment, newCommentHandler] = useState({ 
        comment: ' ',
        published_date : serverTimestamp()  
    });

    const [getComments, getCommentsHandler] = useState([]);

    const [addCommentField, addCommentFieldHandler] = useState(false);

    const [applyChanges, applyChangesHandler] = useState(false);

    // Get the profile ID:first part of the URL (excluding an empty string at the beginning)
    const prof_id = usePathname()
    const parts = prof_id.split('/');
    const profile_id = parts[1];

   // const [editedStatus, editedStatusHandler] = useState(taskInfo.status);

    const [editedPriority, editedPriorityHandler] = useState({
        priority: taskInfo.task_name,
    })

    // Edit description
    const [editedTask, editedTaskHandler] = useState({ 
            task_name: taskInfo.task_name,
            description: taskInfo.description,
    });

    // Edit button selected
    const edit = () => {

        if(applyChanges == true) {
            applyChangesHandler(false)
        }
        else {
            applyChangesHandler(true)

            editedTaskHandler({ 
                task_name : taskInfo.task_name,
                description : taskInfo.description})
            }

    }

    // Close task on button click
    const CloseTask = () => {
            if(state.taskOpen === true) {
                dispatch({type:"TASKOPEN", payload: false });
                dispatch({type:"TASKID", payload: ' '});
              //  addCommentFieldHandler(false)
            }
    }

    // Get task info
    useEffect(() => {

        async function fetchData() {
            try {
                const docRef = doc(db, 'profile', profile_id, 'projects', project_id,  'tasks', state.taskID);
                const json = await getDoc(docRef)
                .then((doc) => { taskInfoHandler(doc.data()) })
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();

    }, []);


    // useEffect(() => {

    //     priorityHandler('G')

    // }, []);

    // Add comment to DB
    const addComment= async (e) => {

            e.preventDefault();

            if(newComment.comment !== ' ')  {
    
                const randomString = generateRandomString(20);
                const profileRef = collection(db, "profile");
    
                await setDoc(doc(profileRef, profile_id, 'projects', project_id, 'tasks', state.taskID, 'comments', randomString), {
                    comment: newComment.comment,
                    published_date: serverTimestamp() 
                });
    
                // Clear form values
                newCommentHandler( {
                    comment: ' ',
                })

                addCommentFieldShow(false)
    
            }
    
    }

    // Get task comments
    useEffect(() => {

        const get_comments_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks', state.taskID, 'comments')) 

        const comments_shapshot = onSnapshot(get_comments_q, (querySnapshot) => {
            
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                getCommentsHandler(itemsArr)
            });

        })
    }, []);


    // Delete task warning
    const DeleteTaskWarningClick = () => {

        if(deleteTaskWarning == true) {
            DeleteTaskWarningHandler(false)
        }
        else {
            DeleteTaskWarningHandler(true)
        }

    }    

    // Cancel delete task warning
    const CancelDeleteTask = () => {
        DeleteTaskWarningHandler(false)
    }

    // Delete task after delete selected in warning
    const DeleteTask = () => {

        // Delete task
        const docRef = doc(db, 'profile', profile_id, 'projects', project_id, 'tasks', state.taskID);
        deleteDoc(docRef)

       document.getElementById(state.taskID).style.display="none";

        DeleteTaskWarningHandler(false)
         dispatch({type:"TASKOPEN", payload: false });
         dispatch({type:"TASKID", payload: ' '});
    }

    // Show comment form
    const addCommentFieldShow = () => {
        if(addCommentField == true) {
            addCommentFieldHandler(false)
        }
        else {
            addCommentFieldHandler(true)
        }
    }

    // Edit description
    const editDescription = async (e) => {
       
        e.preventDefault();

        if(editedTask.task_name !== '' ||
        editedTask.description !== '')  {

            await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'tasks', state.taskID ), {
                task_name: editedTask.task_name.trim(),
                description: editedTask.description,
            });

            applyChangesHandler(false)

        }

    }

    // Edit status
    const editStatus = async (e) => {
       
        e.preventDefault();

        const select_val = e.target.value;

        if(select_val !== taskInfo.status)  {

            await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'tasks', state.taskID ), {
                status: select_val,
            });

        }

    }


    //Edit priority
    const editPriority = async (e) => {
       
        e.preventDefault();

        // const select_val = e.target.value;

        // if(select_val !== taskInfo.status)  {
        //     await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'tasks', state.taskID ), {
        //         priority: select_val,
        //     });

        // }

    }


    return (
        <>
            <TaskPopOut>
                <div>
                    <div className='task__container'>
                        <div className='task__main'>

                            {applyChanges ?
                            <div>
                                <form>
                                    <input 
                                    placeholder={taskInfo.task_name}
                                    className='mb-3'
                                    onChange={(e) => { editedTaskHandler({...editedTask, task_name: e.target.value}) }}
                                    type="text" 
                                    />
                                    <Editor
                                        apiKey="djgjx6t37zoqxtoml83855c5n48wf0and2mh3qvzfa39u7uo"
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            onChange={(e) => { editedTaskHandler({...editedTask, description: editorRef.current.getContent()}) }}
                                            initialValue={taskInfo.description}
                                            init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: [
                                            'advlist','advcode','advtable','autolink','checklist','export',
                                            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                            ],
                                            toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                            'alignleft aligncenter alignright alignjustify | ' +
                                            'bullist numlist checklist | removeformat | a11ycheck code'
                                        }}
                                    />
                                    <button onClick={editDescription}>Apply changes</button>
                                </form>
                                <button onClick={edit}>Cancel</button>
                            </div>
                            
                            :

                            <div>

                                <div className='flex justify-between items-center'>
                                    <h2>{editedTask.task_name ? editedTask.task_name : taskInfo.task_name}</h2>
                                    <button className="flex gap-2 items-center btn--reveal" onClick={edit}><PencilIcon/> <span>edit</span></button>
                                </div>
                                <div className='my-5'>
                                    {editedTask.description ? <div dangerouslySetInnerHTML={{ __html: editedTask.description }}></div> :  <div dangerouslySetInnerHTML={{ __html: taskInfo.description }}></div>}
                                </div>
                            
                                <div>
                                    <CommentList>

                                    { addCommentField && 
                                        <div>

                                        <Editor
                                            apiKey="djgjx6t37zoqxtoml83855c5n48wf0and2mh3qvzfa39u7uo"
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            onChange={(e) => { newCommentHandler({...newComment, comment: editorRef.current.getContent()}) }}
                                            // initialValue="Add a description"
                                            init={{
                                            height: 200,
                                            menubar: false,
                                            plugins: [
                                            'advlist','advcode','advtable','autolink','checklist','export',
                                            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                            ],
                                            toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                            'alignleft aligncenter alignright alignjustify | ' +
                                            'bullist numlist checklist | removeformat | a11ycheck code'
                                            }}
                                        />
                                        <button className="btn btn--submit mb-4" onClick={addComment}>Add comment</button>

                                        </div>
                                    }

                                        <button className="add_comment mb-8 flex gap-2 items-center" onClick={addCommentFieldShow}>
                                            {addCommentField ? 'Cancel' : <CommentIcon />}
                                            {addCommentField ? '' : 'Add comment'}
                                        </button>

                                        {getComments.map((comment, i) => (
                                            <Comment key={i} count={i} content={comment.comment }/>
                                        ))}
                                    </CommentList>
                                </div>

                            </div>

                            }
                            
                        </div>        
                        <div className='task__meta'>
                            <div className='task__meta--top'>
                                <div>
                                    <p>Created on DATE NEEDED <br /> by <b>NAME NEEDED</b></p>
                                </div>

                                <div>
                                    <span className='label'>Status</span>
                                   <form>
                                        <select 
                                            onChange={editStatus}
                                            className="mb-3"> 
                                            <option value="on_hold">On hold</option>
                                            <option value="in_progress" >In progress</option>
                                            <option value="qa">QA</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </form>
                                </div> 

                                 <div>
                                    <span className='label'>Assignee</span>
                                    <p>{taskInfo.assigned}</p>
                                </div>

                                {/* <div className='flex'>
                                    <p className='label'><label for="task_priority">high priority</label></p><br />
                                    {taskInfo.priority}
                                    <form>
                                        <input 
                                        id="task_priority"
                                        checked={taskInfo.priority}
                                     //   onChange={editPriority}
                                       // onChange={(e) => { editedPriorityHandler({ priority: e.target.value}) }}
                                        type="checkbox"/>
                                    </form>
                                </div> */}

                                <div>
                                    <button className="btn mt-5 btn--d-grey" onClick={CloseTask}>Close task</button>
                                </div>

                            </div>

                            <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={DeleteTaskWarningClick}>Delete task</button>
                            </div>

                        </div>
                    </div> 
                </div>
                <div className="overlay" onClick={CloseTask}></div>
            </TaskPopOut>

            {deleteTaskWarning &&
                <DeleteTaskWarning>
                    <div>
                        <h3>Delete task?</h3>
                        <div>
                            <button className='btn' onClick={CancelDeleteTask}>Cancel</button>
                            <button className="btn btn--cancel" onClick={DeleteTask}>Delete</button>
                        </div>
                    </div>
                </DeleteTaskWarning>
            }

        </>
    )

}

export default TaskCardEdit