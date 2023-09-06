// 'use client'
// import { useEffect, useContext, useState } from "react";

// import { collection, doc, getDoc, query, onSnapshot } from 'firebase/firestore';
// import { db } from '@/src/firebase';

// import {globalContext } from "@/app/_context/global-context";

// import FormatDate from "@/app/_functions/formate_date";

// import CommentIcon from "@/app/_svgs/comment";
// import TaskCardComment from "../task-card-comment/task-card-comment.component";
// import Modal from "../modal/modal.component";
// import Comment from "../comment/comment.component";

// import { TaskCardStyle, TaskCardMeta, TaskCardOpen } from "./task-card.styles";

// const TaskCard = (props) => {

//     const { taskName, task_id, profile_id, project_id,assigned } = props;

//     const [taskOpen, taskOpenHandler] = useState(false)
//     const [taskInfo, taskInfoHandler] = useState({})
//     const [showTask, showTaskHandler] = useState('')
//     // Comments
//     const [getComments, getCommentsHandler] = useState([]);

//     const { state, dispatch } = useContext(globalContext);

//     const openTask = (taskID) => {
//         taskOpenHandler(true)
//         showTaskHandler(taskID)
//     }

//     // Get modal card data
//     useEffect ( () => {

//         if (showTask != '' ){
//              async function fetchData() {
//                 try {
//                     const docRef = doc(db, 'profile', profile_id, 'projects', project_id,  'tasks', showTask);
//                     const json = await getDoc(docRef)
//                     .then((doc) => { taskInfoHandler(doc.data()) })
//                     console.log(taskInfo)
//                 } catch (e) {
//                     console.error(e);
//                 }
//         };

//         fetchData();
 
//         }
       
//     }, [showTask])

//     // Get task comments
//     useEffect( () => {

//         if (showTask != '' ){ 

//             // For modal task
//             async function fetchCommentData() {

//                 try {
    
//                     const get_comments_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'tasks', showTask, 'comments')) 
    
//                     const comments_shapshot = onSnapshot(get_comments_q, (querySnapshot) => {
                
//                         let itemsArr = []
            
//                         querySnapshot.forEach((doc) => {
//                             itemsArr.push({...doc.data(), id: doc.id})
//                             getCommentsHandler(itemsArr)
//                         });
            
//                     })
                
//                 } catch (e) {
//                     console.error(e);
//                 }
//             };
    
//             fetchCommentData()

//         }

//         // return () => {
//         //     comments_shapshot()
//         // };

//     }, [showTask])

//     const [secondaryColor, secondaryColorHandler] = useState({
//         secondary_bg : '',
//         secondary_font_color : '',
//     })

//     useEffect(() => {

//         const brandingJSON = localStorage.getItem('planner');
//         const branding = JSON.parse(brandingJSON);

//           secondaryColorHandler({
//             secondary_bg : branding?.secondary_bg,
//             secondary_font : branding?.secondary_font,
//         })
    
//     }, [])

//     const branding_colors = {
//         secondary: {
//             backgroundColor : secondaryColor?.secondary_bg, 
//             color : secondaryColor?.secondary_font,
//         },

//     };

//     // Sort notes by date in DESC order
//     const sortedComments = getComments?.slice().sort((b, a) => {
//         return a.published_date?.seconds - b.published_date?.seconds;
//     });

//     return (
//         <>
//             <TaskCardStyle id={task_id} className="card" style={branding_colors.secondary}>
//               <h3>{taskName}</h3>
//              <TaskCardMeta>
//                 <p><span><CommentIcon /> <TaskCardComment profile_id={profile_id} project_id={project_id} task_id={task_id} /></span></p>
//                 <p className="m-0">{assigned}</p>
//             </TaskCardMeta>
//               <TaskCardOpen onClick={() => {openTask(task_id)}}></TaskCardOpen>
//             </TaskCardStyle>

//             {taskOpen && 

//                 <Modal>
//                     <div className='task__container'>
//                         <div className='task__main'>
//                             <div>
//                                 <div className='flex justify-between items-center'>
//                                     <h2>{taskInfo.task_name}</h2> 
//                                     {/* <button className="flex gap-2 items-center btn--reveal" onClick={editNoteModal}>
//                                         <PencilIcon/><span>edit</span>
//                                         </button> */}
//                                 </div>

//                                  <div className='my-5'>
//                                     <div dangerouslySetInnerHTML={{ __html: taskInfo.description }}></div>
//                                 </div>

//                                 {sortedComments && sortedComments?.map((comment, i) => (
//                                     <Comment key={i} count={i} content={comment.comment } published_date={comment.published_date }/>
//                                     ))
//                                 }

//                             </div>
//                         </div>
                            
//                         <div className='task__meta'>
//                             <div className='task__meta--top'>
//                             <div>
//                                     <p className="mb-5">Created on<br/>{FormatDate(taskInfo?.published_date, true)}</p>
//                                     <p>Created by<br/> <b>NAME NEEDED</b></p>
//                                     </div>
//                             </div>
//                                 <div className='task__button--danger'>
//                                     {/* <button className="btn btn--cancel mt-5" onClick={() => {DeleteNoteWarningHandler(true)}}>Delete note</button> */}
//                                 </div>
//                         </div>
                        
//                     </div>
//                     <div className="overlay" onClick={() => {taskOpenHandler(false)}}></div>
//                     {/* {addNoteMessage && <UpdateMessage copy="Note updated" />} */}
//                 </Modal> 
            
//             }


//         </>
//     )
// }

// export default TaskCard