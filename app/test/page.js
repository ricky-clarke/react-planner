'use client'
import { useEffect , useState} from "react"
import { collection, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import Layout from "../_components/layout/layout.component"
import Modal from "../_components/modal/modal.component";

export default function Page() {

  // Read items
  const [tasksOnHold, OnHoldItems] = useState([ ]);

  const [defaultTaskInfo, defaultTaskInfoHandler] = useState({})

  const [taskOpen, taskOpenHandler] = useState(false)

  const [taskInfo, taskInfoHandler] = useState({})


  useEffect ( () => {

      const on_hold_q = query(collection(db, 'profile', 'WqZkiXKJnC5VrHTQCZrD', 'projects', 'ZqLiH9m3w3g4', 'tasks'), where("status", "==", "on_hold"))
      const on_hold_shapshot = onSnapshot(on_hold_q, (querySnapshot) => {
          
          let itemsArr = []

          querySnapshot.forEach((doc) => {
              itemsArr.push({...doc.data(), id: doc.id})
              OnHoldItems(itemsArr)
          });

      })

  }, [])

  useEffect ( () => {

    async function fetchData() {
      try {
          const docRef = doc(db, 'profile', 'WqZkiXKJnC5VrHTQCZrD', 'projects', 'ZqLiH9m3w3g4',  'tasks', defaultTaskInfo.task_id);
          const json = await getDoc(docRef)
          .then((doc) => { taskInfoHandler(doc.data()) })
      } catch (e) {
          console.error(e);
      }
  };

  fetchData();

}, [defaultTaskInfo])

  const getTaskInfo = (task_id) => {

    defaultTaskInfoHandler({
          task_id : task_id
      })

        taskOpenHandler(true)
   }

   const taskClose = () => {
     taskOpenHandler(false)
     defaultTaskInfoHandler({ })
   }

    console.log(taskInfo)
   console.log(defaultTaskInfo)

  return (
    <Layout>
        <div className='w-3/6'>
          <h1>Test</h1>
          {tasksOnHold.map((task, i) => (
            <div key={i} className='mb-4' 
            onClick={() => {getTaskInfo(task.id)}}>
                <h2>{task.task_name}</h2>
                <p>{task.id}</p>
            </div>
          ))}
          
          {taskOpen &&
            
            <Modal>
              { taskInfo.task_name}<br/>{taskInfo.project_id}<br/>
              {taskInfo.description}
              <br/>
              <br/>
              <br/>
              <button onClick={taskClose}>Close</button>
              <div className="overlay" onClick={taskClose}></div>
            </Modal>
          
          }

        </div>

    </Layout>
  )
}
