'use client'
import { useState, useEffect, useRef, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { 
    collection, 
    setDoc, 
    getDoc,
    doc, 
    query,
    onSnapshot,
    updateDoc,
    deleteDoc,
    serverTimestamp, 
} from 'firebase/firestore';
import { db } from '@/src/firebase';
import { Editor } from '@tinymce/tinymce-react';
import Layout from "@/app/_components/layout/layout.component";
import Modal from "@/app/_components/modal/modal.component";
import ProjectHeader from '@/app/_components/project-header/project-header.component';
import UpdateMessage from '@/app/_components/update-message/update-message.component';
import { Note, NoteMeta } from '@/app/[client]/client-dashboard-notes';
import FormatDate from '@/app/_functions/formate_date';
import generateRandomString from '@/app/_functions/random_string';
import Masonry from 'react-masonry-css';
import PencilIcon from '@/app/_svgs/pencil';
import { DeleteModal } from '@/app/styles/delete-modal';

export default function Page({params}) {

  // Get the first part of the URL (excluding an empty string at the beginning)
  const prof_id = usePathname()

  const text_api_key = `${process.env.NEXT_PUBLIC_TINYMCE}`;

  // Get project info
  const [profileInfo, profileInfoHandler] = useState({})

  const profile_id_part_1 = prof_id.split('/'); 
  const profile_id = profile_id_part_1[1]; // get profile ID from URL
  const project_url = prof_id.split('/').slice(0, -1).join('/') // Get project URL from slug
  const project_id = profile_id_part_1[3]; // Get project ID from URL

  const editorRef = useRef(null);

  // Modal form
  const [addNoteForm, addNoteFormHandler] = useState(false)

  const [getNotes, getNotesHandler] = useState([])

  // View note in modal
  const [viewNoteOpen, viewNoteHandler] = useState(false)

  const [noteOpenInfo, noteOpenInfoHandler] = useState({})
  const [getNoteInfo, getNoteInfoHandler] = useState({})

  // Edit note
  const [editNoteOpen, editNoteOpenHandler] = useState(false) // Edit note in modal
  // add values to state when edit modal open
  const [editedNote, editedNoteHandler] = useState({});

  const [newNote, setNewNote] = useState({ 
      title: ' ',
      content: ' ',
      created_by : '',
      published_date : serverTimestamp(),
  });

  // Delete note
  const [deleteNoteWarning, DeleteNoteWarningHandler] = useState(false);

  // Updated message
  const [addNoteMessage, addNoteMessageHandler] = useState(false)


// Get project info
useEffect(() => {
  async function fetchData() {
      try {
          // const docRef = doc(db, 'task', state.taskID);
          const docRef = doc(db, 'profile', profile_id, 'projects', project_id);
          const json = await getDoc(docRef)
          .then((doc) => { profileInfoHandler(doc.data()) })
      } catch (e) {
          console.error(e);
      }
  };
  fetchData();
}, []);

const handleNoteInputChange = (event) => {
  const { name, value } = event.target;
  setNewNote((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

// Add note to DB
const addNote = async (e) => {

    e.preventDefault();

    if(newNote.title !== ' ' || 
      newNote.content !== ' '  ||
      newNote.published_date !== '') {

      const randomString = generateRandomString(20);

      await setDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'notes', randomString), {
            title: newNote.title.trim(),
            content: newNote.content,
            created_by: '',
            published_date: serverTimestamp(),
        });

        // Clear form values
        // setNewNote( {
        //     title: ' ',
        //     content: ' ',
        //     created_by: ' ',
        //     published_date: '',
        // })

        addNoteFormHandler(false) // Hide form on submit

    }

}

// Read all project notes from DB and add to state
useEffect ( () => {

        const notes_q = query(collection(db, 'profile', profile_id, 'projects', project_id, 'notes'))
        const completed_snapshot = onSnapshot(notes_q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
                getNotesHandler(itemsArr)
            });
        })

}, [])

// View note
const viewNote = (id) => {

    if(viewNoteOpen == false) {
      viewNoteHandler(true)
      noteOpenInfoHandler({note_id : id })
    }
    else {
      viewNoteHandler(false)
      noteOpenInfoHandler({note_id : ' ' })
      editNoteOpenHandler(false)
      editedNoteHandler({})
    }
   
}

// Get modal note info
useEffect ( () => {

    async function fetchData() {
        try {
            const docRef = doc(db, 'profile', profile_id, 'projects', project_id, 'notes', noteOpenInfo.note_id);
            const json = await getDoc(docRef)
            .then((doc) => { getNoteInfoHandler(doc.data()) })
        } catch (e) {
            console.error(e);
        }
    };

     fetchData();

}, [noteOpenInfo])


// If edit note button selected
const editNoteModal = () => {

  if(editNoteOpen == true) {
     editNoteOpenHandler(false) // Open edit form
}
else {
    editNoteOpenHandler(true) // close edit form

    editedNoteHandler({})
    // add current note title and content to state
    editedNoteHandler({  
        title : getNoteInfo.title,
        content : getNoteInfo.content})
    }

}

// Edit note (update DB)
const editNote = (e) => {

         
  e.preventDefault();

  const noteUpdated = async () => {

    try {
      
          if(editedNote.title !== '' ||
          editedNote.content !== '')  {

          await updateDoc(doc(collection(db, "profile"), profile_id, 'projects', project_id, 'notes', noteOpenInfo.note_id), {
              title: editedNote.title.trim(),
              content: editedNote.content,
          });

            editNoteOpenHandler(false) // Close Edit note form (inside modal)
            editedNoteHandler({ }) // Clear state
            noteOpenInfoHandler({note_id : noteOpenInfo.note_id })
            addNoteMessageHandler(true)
          }

    }
    catch (error) {
      console.error('An error occurred:', error.message);
    }

  }

  noteUpdated()
  addNoteMessageHandler(false)

}

// Delete note warning
const DeleteNoteWarningClick = () => {

  if(deleteNoteWarning == true) {
      DeleteNoteWarningHandler(false)
  }
  else {
    DeleteNoteWarningHandler(true)
  }

}   

// Delete note
const DeleteNote = () => {

  const docRef = doc(db, 'profile', profile_id, 'projects', project_id, 'notes', noteOpenInfo.note_id);
  deleteDoc(docRef)

  DeleteNoteWarningHandler(false)
  viewNoteHandler(false)
  noteOpenInfoHandler({note_id : ' ' })
}

// Masonry settings
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  900: 2,
  500: 1
};

// Sort notes by date in DESC order
const sortedNotes = getNotes?.slice().sort((b, a) => {
  return a.published_date?.seconds - b.published_date?.seconds;
});

  return (
    <Layout>

        <div className="flex justify-between content-baseline">
          <ProjectHeader
            page_title='Notes'
            profile_name={profileInfo?.profile_name}
            project_id={project_id}
          />
          <div className="text-center flex justify-center gap-6 items-center">
            <a href={`${project_url}`}>Tasks</a>
            <span><b>Notes</b></span>|
            <button className='btn btn--submit' onClick={() => {addNoteFormHandler(true)}}>Create a note</button>
          </div>
      </div>

          <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column">
                {sortedNotes?.map((note, i) => (
                 <Note key={i} onClick={() => { viewNote(note.id)}}>
                      <h3>{note?.title}</h3>
                        <NoteMeta>
                              {FormatDate(note?.published_date, true)}
                              <p>IMG</p>
                        </NoteMeta>
                    </Note>
                  ))}
          </Masonry>

          {addNoteForm &&
            <Modal>
                <form>
                    <div className='task__container'>
                        <div className='task__main'>
                            <h2>Add note</h2>
                            <p className='label'><label>Title</label></p>
                                <input 
                               onChange={(e) => { setNewNote({...newNote, title: e.target.value}) }}
                                type="text" 
                                placeholder = "Note title"
                                required
                                />
                                 <Editor
                                    apiKey={text_api_key}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onChange={(e) => { setNewNote({...newNote, content: editorRef.current.getContent()}) }}
                                    initialValue=""
                                    init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                    'advlist','autolink', 'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','media','table','help','wordcount'
                                    ],
                                    toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist checklist | removeformat | a11ycheck code'
                                    }}
                                    />
                        </div>
                        <div className='task__meta'>
                            <div className='task__meta--top'>
                                <div>
                                <div>
                                    <p className="label">Created by <br /><b>NAME NEEDED</b></p>
                                </div>
                                <button onClick={addNote} className='btn btn--submit mr-4'>Add note</button>
                                  <button className="btn btn--d-grey mt-5" onClick={() => {addNoteFormHandler(false)}}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </form>
                <div className="overlay" onClick={() => {addNoteFormHandler(false)}}></div>
            </Modal>
          }

          { viewNoteOpen &&
           <Modal>
                <div className='task__container'>
                      <div className='task__main'>

                          {editNoteOpen ?

                          <div>
                              <form>
                                <p className='label'><label>Title</label></p>
                                  <input 
                                  className='mb-3' 
                                  onChange={(e) => { editedNoteHandler({...editedNote, title: e.target.value}) }}
                                  type="text" 
                                  defaultValue = {getNoteInfo?.title}
                                  />
                                  <Editor
                                    apiKey={text_api_key}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onChange={(e) => { editedNoteHandler({...editedNote, content: editorRef.current.getContent()}) }}
                                    initialValue={getNoteInfo?.content}
                                    init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                    'advlist','autolink', 'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','media','table','help','wordcount'
                                    ],
                                    toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist checklist | removeformat | a11ycheck code'
                                    }}
                                    />
                                <div className='flex gap-6'>
                                      <button onClick={editNote}>Apply changes</button>
                                      <button onClick={editNoteModal}>Cancel</button>
                                </div>
                              </form>

                          </div>
                          
                          :
                      
                            <div>
                              <div className='flex justify-between items-center'>
                                    <h2>{getNoteInfo?.title}</h2> 
                                    <button className="flex gap-2 items-center btn--reveal" onClick={editNoteModal}><PencilIcon/> <span>edit</span></button>
                                </div>
                                <div className="my-5" dangerouslySetInnerHTML={{ __html: getNoteInfo?.content }}></div>
                            </div>

                            }
                          
                      </div>
                      <div className='task__meta'>
                          <div className='task__meta--top'>
                              <div>
                                  <div>
                                      <h3 className='mb-3'>History</h3>
                                      <p className="mb-5">Modified on: <b>DATE</b> <br/>
                                      by <b>NAME NEEDED</b>
                                      </p>
                                      <p className="mb-5">Created on<br/>
                                      {FormatDate(getNoteInfo?.published_date, true)}
                                      </p>
                                      <p className="mb-5">Created by<br/> <b>NAME NEEDED</b></p>
                                  </div>
                                </div>
                          </div>
                            <div className='task__button--danger'>
                                <button className="btn btn--cancel mt-5" onClick={DeleteNoteWarningClick}>Delete note</button>
                            </div>
                      </div>
                </div> 
              <div className="overlay" onClick={viewNote}></div>
           </Modal>
          }

          {deleteNoteWarning &&
                <DeleteModal>
                    <div>
                        <h3>Delete note?</h3>
                        <div>
                            <button className='btn' onClick={() => {DeleteNoteWarningHandler(false)}}>Cancel</button>
                            <button className="btn btn--cancel" onClick={DeleteNote}>Delete</button>
                        </div>
                    </div>
                </DeleteModal>
            }

          {addNoteMessage && 
            <UpdateMessage copy="Note updated" />
          }

    </Layout>
  )
}