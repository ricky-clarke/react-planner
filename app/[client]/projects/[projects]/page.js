'use client'
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, collection, deleteDoc } from 'firebase/firestore';
import { db } from '@/src/firebase';
import ProjectHeader from "@/app/_components/project-header/project-header.component";
import Sprint from "@/app/_components/sprint/sprint.component"
import globalContext from "@/app/_context/global-context";
import Layout from "@/app/_components/layout/layout.component";
import Modal from "@/app/_components/modal/modal.component";
import { DeleteModal } from "@/app/styles/delete-modal";
import FormatDate from "@/app/_functions/formate_date";
import UpdateMessage from "@/app/_components/update-message/update-message.component";

export default function Page({ params }) {

  const project_id = params.projects;
  const router = useRouter();
  
  const { state } = useContext(globalContext);
  const [projectInfo, ProjectInfoHandler] = useState({})
  const [projectSettingsModal, projectSettingsModalHandler] = useState(false)

  // Get the first part of the URL (excluding an empty string at the beginning)
  const prof_id = usePathname()
  const parts = prof_id.split('/');
  const profile_id = parts[1];

  const [closeProject, closeProjectHandler] = useState({
    project_status : projectInfo.project_status
  })

  const [editProject, editProjectHandler] = useState({
    project_name : '',
    project_status : closeProject.project_status
  })

const [deleteTaskWarning, deleteTaskWarningHandler] = useState(false);

// Project updated message
const [projectUpdateMessage, projectUpdateMessageHandler] = useState(false)

useEffect(() => {
    async function fetchData() {
        try {
            const docRef = doc(db, 'profile', profile_id, 'projects', project_id);
            const json = await getDoc(docRef)
            .then((doc) => { ProjectInfoHandler(doc.data()) })
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();
}, []);

// Update if project has been edited
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
}, [editProject]);

// Open project settings in modal
const openProjectSettings = () => {

  if(projectSettingsModal == false) {
    projectSettingsModalHandler(true)
  }
  else {
    projectSettingsModalHandler(false)
    deleteTaskWarningHandler(false)

  }

}

// Edit Title
const editProjectTitle = (e) => {
       
      e.preventDefault();

      const updateProject = async () => {  

        try {

          if(editProject.task_name !== '')  {

            await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id ), {
                project_name: editProject.project_name.trim(),
            });

                editProjectHandler({ })
                projectUpdateMessageHandler(true)
      
            }

        }
        catch {

        }

      }

      updateProject()
      projectUpdateMessageHandler(false)



}

// Delete project
const deleteProject= (e) => {

  e.preventDefault

    // Delete task
    const docRef = doc(db, 'profile', profile_id, 'projects', project_id);
    deleteDoc(docRef)
  
    projectSettingsModalHandler(false)
    deleteTaskWarningHandler(false)

    router.push(`/${profile_id}`); 

}

// Close project
const closeProjectClick = (e) => {

      if(projectInfo.project_status === 'Open')  {

        async function closeProject() {
          await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id), {
            project_status: 'Closed'
        });

        editProjectHandler({project_status : 'Close'})

        }

        closeProject()


      }

}

// Reopen project 
const reOpenProjectClick = () => {

  if(projectInfo.project_status === 'Closed')  {

    async function openProject() {
      await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id), {
        project_status: 'Open'
    });

    editProjectHandler({project_status : 'Open'})

    }

    openProject()

  }

}

  return (
    <Layout>

      <div className="flex justify-between content-baseline">
          <ProjectHeader
            page_title={projectInfo.project_name}
            profile_name={projectInfo.profile_name}
            project_status = {projectInfo.project_status}
          />
          <div className="text-center flex justify-center gap-6 items-center">
            <a href={`${prof_id}`}>
              <b>Tasks</b>
            </a>
            <a href={`${prof_id}/notes`}>Notes</a>|
            <button className="btn btn--submit" onClick={openProjectSettings}>Project settings</button>
          </div>
      </div>

      <div className="sprint_grid">
        <Sprint project_id={project_id} />
      </div>

      {state.taskOpen === true && <TaskCardEdit project_id={project_id} />}

      {projectSettingsModal && (
        <Modal>
          <div className="task__container">
            <div className="task__main">
              <div>
                <h2>Project settings</h2>
                <form className="mt-4">
                  <p className="label">
                    <label>Project name</label>
                  </p>
                  <input
                    type="text"
                    className="w-full"
                    defaultValue={projectInfo.project_name}
                    onChange={(e) => {
                      editProjectHandler({
                        ...editProject,
                        project_name: e.target.value,
                      });
                    }}
                  />
                  <div className="flex gap-5 mt-5">
                    <button
                      onClick={editProjectTitle}
                      className="btn btn--submit"
                    >
                      Update project
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="task__meta">
              <div className="task__meta--top">
                <div>
                <p className="mb-1">
                    Project status
                    <br />
                    {projectInfo?.project_status}
                  </p>
                  <p className="my-5">
                    Created on
                    <br />
                    {FormatDate(projectInfo?.published_date, true)}
                  </p>
                  <p>
                    Created by
                    <br /> <b>NAME NEEDED</b>
                  </p>
                </div>
              </div>

              <div className="flex justify-between task__button--danger">
              {projectInfo.project_status == 'Open' ? 
                  <button onClick={closeProjectClick} className="btn btn--grey mt-5">
                      Close project
                  </button>
                  :
                  <button onClick={reOpenProjectClick} className="btn btn--grey mt-5">
                      Reopen project
                  </button>
                  }
                <button
                  className="btn btn--cancel mt-5"
                  onClick={() => {
                    deleteTaskWarningHandler(true);
                  }}
                >
                  Delete project
                </button>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={openProjectSettings}></div>
        </Modal>
      )}

      {deleteTaskWarning && (
        <DeleteModal>
          <div>
            <h3>Delete Project?</h3>
            <div>
              <button
                className="btn"
                onClick={() => {
                  deleteTaskWarningHandler(false);
                }}
              >
                Cancel
              </button>
              <form>
                <button className="btn btn--cancel" onClick={deleteProject}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </DeleteModal>
      )}

      {projectUpdateMessage && <UpdateMessage copy="Project updated" />}

    </Layout>
  );
}
