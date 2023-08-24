'use client'
import { useState, useEffect, useRef, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { 
    collection, 
    setDoc, 
    doc, 
    querySnapshot, 
    onSnapshot, 
    query, 
    where,
     serverTimestamp, 
     getDoc,
     updateDoc,
     deleteDoc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import globalContext from '@/app/_context/global-context';
import { SprintColumn, SprintColumnCard, TaskCardMeta, CommentListContainer } from './sprint.styles';
import {users} from '../../users';
import { Editor } from '@tinymce/tinymce-react';
import generateRandomString from '@/app/_functions/random_string';
import Modal from '../modal/modal.component';
import Comment from '../comment/comment.component';
import CommentIcon from '@/app/_svgs/comment';
import PencilIcon from '@/app/_svgs/pencil';
import { DeleteModal } from '@/app/styles/delete-modal';

const Sprint = (props) => {

    const editorRef = useRef(null);
    const { state, dispatch } = useContext(globalContext);

    // Get the first part of the URL (excluding an empty string at the beginning)
    const prof_id = usePathname()
    const parts = prof_id.split('/');
    const profile_id = parts[1];
    const { project_id } = props;

    // Sprint tasks
    const [tasksOnHold, OnHoldItems] = useState([ ]);
    const [taskInProgress, InProgressItems] = useState([ ]);
    const [taskQAItems, QAItems] = useState([ ]);
    const [taskCompletedItems, CompletedItems] = useState([ ]);

   // Create task
    const [createTaskShow, createTaskHandler] = useState(false);

    // Modal task
    const [defaultTaskInfo, defaultTaskInfoHandler] = useState({})
    const [taskOpen, taskOpenHandler] = useState(false)
    const [taskInfo, taskInfoHandler] = useState({})

    // Edt task title / description
    const [applyChanges, applyChangesHandler] = useState(false);
    const [editedTask, editedTaskHandler] = useState({ 
            task_name: '',
            description: '',
    });

    // Get task status
    const [getStatus, getStatusHandler] = useState('')

    // Comments 
    const [addCommentField, addCommentFieldHandler] = useState(false);
    const [getComments, getCommentsHandler] = useState([]);
    const [newComment, newCommentHandler] = useState({ 
        comment: ' ',
        published_date : serverTimestamp()  
    });

    // Delete task
    const [deleteTaskWarning, DeleteTaskWarningHandler] = useState(false);


    useEffect ( () => {

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

        async function fetchCommentData() {

            try {

                const get_comments_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks', state.taskID, 'comments')) 

                const comments_shapshot = onSnapshot(get_comments_q, (querySnapshot) => {
            
                    let itemsArr = []
        
                    querySnapshot.forEach((doc) => {
                        itemsArr.push({...doc.data(), id: doc.id})
                        getCommentsHandler(itemsArr)
                    });
        
                })
            
            } catch (e) {
                console.error(e);
            }
        };

        fetchCommentData()

        async function addDefaultEditValues () {

            try {

                editedTaskHandler({
                    task_name: taskInfo.task_name,
                    description: taskInfo.description,
                })

            }
            catch (e) {
                console.error(e);
            }

        };

        addDefaultEditValues()


    }, [defaultTaskInfo])

    useEffect( ()=> {

        async function fetchTaskStatus() {

            try {
                getStatusHandler(taskInfo.status)
            
            } catch (e) {
                console.error(e);
            }
        };

        fetchTaskStatus()

    }, [taskInfo])


    // Modal task info
    const getTaskInfo = (task_id) => {

        defaultTaskInfoHandler({
              task_id : task_id
          })
    
        taskOpenHandler(true)
        dispatch({type:"TASKID", payload: task_id});
        editedTaskHandler([])
    }

    // Close Modal
    const modalClose = () => {
        taskOpenHandler(false)
        defaultTaskInfoHandler({ })
        getCommentsHandler([])
        applyChangesHandler(false)
        dispatch({type:"TASKID", payload: ''});
        editedTaskHandler([])
        getStatusHandler('')
    }

    // Cancel create task button 
    const CancelCreateTask = () => {
        createTaskHandler(false)
        dispatch({type:"TASKID", payload: ''});
    }

    const [newItem, setNewItem] = useState({ 
        title: ' ',
        description: ' ',
        status: 'on_hold',
        assigned: ' ' ,
        project_id: project_id,
        task_id : '',
        published_date : serverTimestamp(),
        priority : false,
    });

    // Create task button
    const CreateTaskClick = (event) => {

            if(createTaskShow == true) {
                createTaskHandler(false)
                //  createTaskStatusHandler(' ')
            }
            else {
                createTaskHandler(true)
            }
    
    }

    // Add task to DB
    const addItem = async (e) => {

        e.preventDefault();

        if(newItem.title !== ' ' || 
            newItem.description !== ' '  ||
            newItem.status !== ' ' ||
            newItem.priority !== ' ' ||
            newItem.assigned !== ' ' ||
            newItem.published_date.trim() !== '') {

        const randomString = generateRandomString(20);

        const profileRef = collection(db, "profile");

            await setDoc(doc(profileRef, profile_id, 'projects', project_id, 'tasks', randomString), {
                task_name: newItem.title.trim(),
                description: newItem.description,
                status: newItem.status,
                assigned: newItem.assigned.trim(),
                project_id: project_id,
                published_date: serverTimestamp(),
            //    priority : newItem.priority
            });

            // Clear form values
            setNewItem( {
                title: ' ',
                description: ' ',
                information: ' ',
                assigned: ' ',
                status: 'on_hold'
            })

            createTaskHandler(false) // Hide form on submit
            dispatch({type:"TASKID", payload: ''});

        }

    }
    
    // Read all tasks from DB
    useEffect ( () => {

        // On hold
        const on_hold_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks'), where("status", "==", "on_hold"))
        const on_hold_shapshot = onSnapshot(on_hold_q, (querySnapshot) => {
            
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                OnHoldItems(itemsArr)
            });

        })

        // In progress
        const in_progress_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks'), where("status", "==", "in_progress"),)
        const in_progress_snapshot = onSnapshot(in_progress_q, (querySnapshot) => {
            
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                InProgressItems(itemsArr)
            });

        })

        // QA
        const qa_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks'), where("status", "==", "qa"),)
        const qa_snapshot = onSnapshot(qa_q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                QAItems(itemsArr)
            });
    
        })

        // Completed
        const completed_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks'), where("status", "==", "completed"),)
        const completed_snapshot = onSnapshot(completed_q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                CompletedItems(itemsArr)
            });
        })

    }, [])

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

    // Edit status
    const editStatus = async (e) => {
       
        e.preventDefault();

        const select_val = e.target.value;

        getStatusHandler(select_val)

        if(select_val !== taskInfo.status)  {

            await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'tasks', state.taskID ), {
                status: select_val,
            });

            defaultTaskInfoHandler({})
            getCommentsHandler([])
            applyChangesHandler(false)
           // dispatch({type:"TASKID", payload: ''});
            editedTaskHandler([])
           // taskOpenHandler(false)
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
                defaultTaskInfoHandler({ })
    
            }
    
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

    // Add comment to DB
    const addComment= async (e) => {

        e.preventDefault();

        if(newComment.comment !== ' ')  {

            const randomString = generateRandomString(20);
            const profileRef = collection(db, "profile");

            await setDoc(doc(profileRef, profile_id, 'projects', project_id, 'tasks', defaultTaskInfo.task_id, 'comments', randomString), {
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

    // Delete task warning
    const DeleteTaskWarningClick = () => {

        if(deleteTaskWarning == true) {
            DeleteTaskWarningHandler(false)
        }
        else {
            DeleteTaskWarningHandler(true)
        }
    
    }   

    // Delete task after delete selected in warning
    const DeleteTask = () => {
    
            // Delete task
            const docRef = doc(db, 'profile', profile_id, 'projects', project_id, 'tasks', state.taskID);
            deleteDoc(docRef)
    
      //     document.getElementById(state.taskID).style.display="none";
    
            DeleteTaskWarningHandler(false)
            taskOpenHandler(false)
            getCommentsHandler([])
            getStatusHandler('')
             dispatch({type:"TASKID", payload: ' '});
    }

    // Sort notes by date in DESC order
const sortedComments = getComments?.slice().sort((b, a) => {
    return a.published_date?.seconds - b.published_date?.seconds;
  });


    return (
        <>
            <SprintColumn id="sprint_column__on_hold">
                <div className='sprint__column'>
                    <div className='sprint__column__top'>
                        <h2>On hold</h2>
                        {tasksOnHold?.map((task, i) => (
                             <SprintColumnCard key={i} onClick={() => {getTaskInfo(task.id)}}>
                               <h3>{task.task_name}</h3>
                                <TaskCardMeta>
                                    <p>date <span><CommentIcon />0</span></p>
                                    <p>IMG</p>
                                    {/* {new Date(taskInfo.timestamp)} */}
                                    {/* <p className="m-0">{taskAssigned ? taskAssigned : 'Unassigned' }</p> */}
                                </TaskCardMeta>
                             </SprintColumnCard>
                        ))}
                    </div>
                     <div><button onClick={CreateTaskClick}>Create task</button></div>
                </div>
            </SprintColumn>

            <SprintColumn id="sprint_column__on_hold">
                <div className='sprint__column'>
                    <div className='sprint__column__top'>
                        <h2>In progress</h2>
                        {taskInProgress?.map((task, i) => (
                            <SprintColumnCard key={i} onClick={() => {getTaskInfo(task.id)}}>
                                <h3>{task.task_name}</h3>
                                <TaskCardMeta>
                                    <p>date <span><CommentIcon /> 0</span></p>
                                    <p>IMG</p>
                                    {/* {new Date(taskInfo.timestamp)} */}
                                    {/* <p className="m-0">{taskAssigned ? taskAssigned : 'Unassigned' }</p> */}
                                </TaskCardMeta>
                        </SprintColumnCard>
                        ))}
                    </div>
                     <div><button onClick={CreateTaskClick}>Create task</button></div>
                </div>
            </SprintColumn>

            <SprintColumn id="sprint_column__on_hold">
                <div className='sprint__column'>
                    <div className='sprint__column__top'>
                        <h2>QA</h2>
                        {taskQAItems?.map((task, i) => (
                            <SprintColumnCard key={i} onClick={() => {getTaskInfo(task.id)}}>
                                <h3>{task.task_name}</h3>
                                <TaskCardMeta>
                                    <p>date <span><CommentIcon /> 0</span></p>
                                    <p>IMG</p>
                                    {/* {new Date(taskInfo.timestamp)} */}
                                    {/* <p className="m-0">{taskAssigned ? taskAssigned : 'Unassigned' }</p> */}
                                </TaskCardMeta>
                        </SprintColumnCard>
                        ))}
                    </div>
                     <div><button onClick={CreateTaskClick}>Create task</button></div>
                </div>
            </SprintColumn>

            <SprintColumn id="sprint_column__on_hold">
                <div className='sprint__column'>
                    <div className='sprint__column__top'>
                        <h2>Completed</h2>
                        {taskCompletedItems?.map((task, i) => (
                            <SprintColumnCard key={i} onClick={() => {getTaskInfo(task.id)}}>
                                <h3>{task.task_name}</h3>
                                <TaskCardMeta>
                                    <p>date <span><CommentIcon /> 0</span></p>
                                    <p>IMG</p>
                                    {/* {new Date(taskInfo.timestamp)} */}
                                    {/* <p className="m-0">{taskAssigned ? taskAssigned : 'Unassigned' }</p> */}
                                </TaskCardMeta>
                        </SprintColumnCard>
                        ))}
                    </div>
                     <div><button onClick={CreateTaskClick}>Create task</button></div>
                </div>
            </SprintColumn>

            {taskOpen &&
                <Modal>
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
                                            <div className='flex gap-6'>
                                                <button onClick={editDescription}>Apply changes</button>
                                                <button onClick={edit}>Cancel</button>
                                            </div>
                                        </form>
                                       
                                    </div>

                                :

                                    <div>
                                        <div className='flex justify-between items-center'>
                                            <h2>{taskInfo?.task_name}</h2> 
                                            <button className="flex gap-2 items-center btn--reveal" onClick={edit}><PencilIcon/> <span>edit</span></button>
                                        </div>

                                        <div className='my-5'>
                                            <div dangerouslySetInnerHTML={{ __html: taskInfo?.description }}></div>
                                        </div>

                                        <div>
                                            <CommentListContainer>

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

                                                {sortedComments && sortedComments?.map((comment, i) => (
                                                        <Comment key={i} count={i} content={comment.comment } published_date={comment.published_date }/>
                                                    ))
                                                }

                                            </CommentListContainer>
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
                                                onChange ={editStatus}
                                                className ="mb-3"
                                                value={getStatus}> 
                                                <option value ="on_hold">On hold</option>
                                                <option value ="in_progress">In progress</option>
                                                <option value ="qa">QA</option>
                                                <option value ="completed">Completed</option>
                                            </select>
                                        </form>
                                    </div> 
                                    <div>
                                        <span className='label'>Assignee</span>
                                        <p>{taskInfo?.assigned ? taskInfo?.assigned : 'Not assigned'}</p>
                                    </div>
                            </div>

                            <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={DeleteTaskWarningClick}>Delete task</button>
                            </div>

                        </div>
                        </div>
                <div className="overlay" onClick={modalClose}></div>
                </Modal>
            }

            {deleteTaskWarning &&
                <DeleteModal>
                    <div>
                        <h3>Delete task?</h3>
                        <div>
                            <button className='btn' onClick={() => {DeleteTaskWarningHandler(false)}}>Cancel</button>
                            <button className="btn btn--cancel" onClick={DeleteTask}>Delete</button>
                        </div>
                    </div>
                </DeleteModal>
            }

            {createTaskShow &&
                <Modal>
                    <form>
                        <div className='task__container'>
                                <div className='task__main'>
                                    <h2>Create task</h2>
                                    <div>
                                        <p className='label'><label>Name</label></p>
                                        <input 
                                        onChange={(e) => { setNewItem({...newItem, title: e.target.value}) }}
                                        type="text" 
                                        placeholder = "Task title" 
                                        />
                                    </div>
                                    <div>
                                        <p className='label'><label>Description</label></p>
                                        <Editor
                                            apiKey="djgjx6t37zoqxtoml83855c5n48wf0and2mh3qvzfa39u7uo"
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            onChange={(e) => { setNewItem({...newItem, description: editorRef.current.getContent()}) }}
                                            initialValue="Add a description"
                                            init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                            'advlist','advcode','advtable','autolink','checklist','export',
                                            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                            ],
                                            toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                            'alignleft aligncenter alignright alignjustify | ' +
                                            'bullist numlist checklist | removeformat | a11ycheck code'
                                            // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                            />
                                    </div>
                                </div>
                            <div className='task__meta'>
                                <div className='task__meta--top'>
                                    <div>
                                        <p className="label">Created <br /><b>NAME NEEDED</b></p>
                                    </div>
                                    <div>           
                                        <p className='label'><label>Status</label></p>
                                        <select 
                                        onChange={(e) => { setNewItem({...newItem, status: e.target.value}) }}
                                        className="mb-3"
                                        defaultValue="on_hold"
                                        > 
                                            <option value="on_hold">On hold</option>
                                            <option value="in_progress">In progress</option>
                                            <option value="qa">QA</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className='label'><label>Allocated to</label></p>
                                         <select onChange={(e) => { setNewItem({...newItem, assigned: e.target.value}) }} className="mb-3"> 
                                            <option defaultValue>Unassigned</option>
                                                {users.map((user, i) => (<option key={i}>{user.name}</option>))}
                                            </select>
                                    </div>

                                    {/* <div className='flex'>
                                        <p className='label'><label for="task_priority">high priority</label></p>
                                        <input 
                                        id="task_priority" 
                                        type="checkbox" 
                                        onChange={(e) => { setNewItem({...newItem, priority: e.target.value}) }}  />
                                        </div> */}

                                    <div>
                                        <button onClick={addItem} className='btn btn--submit mr-4'>Add task</button>
                                        <button className="btn btn--d-grey mt-5" onClick={CancelCreateTask}>Cancel</button>
                                    </div>

                                </div>
                            </div>
                    </div> 
                    </form>
                    <div className="overlay" onClick={CancelCreateTask}></div>
                </Modal>
            }

        </>
    )

}

export default Sprint