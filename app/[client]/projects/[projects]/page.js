'use client'
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import Sprint from "@/app/_components/sprint/sprint.component"
import TaskCardEdit from "@/app/_components/taskOLD/task.component";
import globalContext from "@/app/_context/global-context";
import Layout from "@/app/_components/layout/layout.component";

export default function Page({ params }) {

  const project_id = params.projects;
  
  const { state } = useContext(globalContext);
  const [projectInfo, ProjectInfoHandler] = useState({})

  // Get the first part of the URL (excluding an empty string at the beginning)
  const prof_id = usePathname()
  const parts = prof_id.split('/');
  const profile_id = parts[1];

  useEffect(() => {
    async function fetchData() {
        try {
            // const docRef = doc(db, 'task', state.taskID);
            const docRef = doc(db, 'profile', profile_id, 'projects', project_id);
            const json = await getDoc(docRef)
            .then((doc) => { ProjectInfoHandler(doc.data()) })
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();
}, []);

  return (
    <Layout>
      
        <p className="sub_heading"><Link href={`/${profile_id}`}>{projectInfo.profile_name}</Link></p>
        <div className="flex justify-between align-center">
          <h1 className="pr-5 mb-0">{projectInfo.project_name}</h1>
        </div>

        <div className="text-center mt-3 mb-8 flex justify-center gap-6 items-center">
            <a href={`${prof_id}`}><b>Tasks</b></a>
            <span>Budget</span>
            <a href={`${prof_id}/notes`}>Notes</a>
            <span>Resources</span>
          </div>
     
        <div className="sprint_grid">
            <Sprint project_id={project_id} />
        </div>

      {state.taskOpen === true && <TaskCardEdit project_id={project_id}/> }

    </Layout>
  )
}
