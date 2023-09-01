import { useRef, useState } from 'react';
import { usePathname  } from 'next/navigation'
// import globalContext from '@/app/_context/global-context';
import { collection, doc, updateDoc, setDoc, serverTimestamp, deleteDoc} from 'firebase/firestore';
 import { db } from '@/src/firebase';
import Modal from '../modal/modal.component';
import FormatDate from '@/app/_functions/formate_date';
import PencilIcon from '@/app/_svgs/pencil';
import UpdateMessage from '../update-message/update-message.component';
import { Editor } from '@tinymce/tinymce-react';
import { DeleteModal } from '@/app/styles/delete-modal';
import { NoteCard } from './note.styles';

const Note = (props) => {

    const { title, publish_date, copy, id } = props;
    const editorRef = useRef(null);
    const prof_id = usePathname()
    const profile_id = prof_id.replace('/','') // Get profile ID

    const text_api_key = `${process.env.NEXT_PUBLIC_TINYMCE}`;


    const [ openNoteModal, openNoteModalHandler] = useState(null)
    const [ editNote, editNoteHandler] = useState(null)
    const [ updatedNote, updatedNoteHandler] = useState({
        title: title,
        copy: copy
    })

    const [addNoteMessage, addNoteMessageHandler] = useState(false)  // Updated message

    // Delete note
    const [deleteNoteWarning, DeleteNoteWarningHandler] = useState(false);

    // Note modal
    const openNote = (e) => {
        openNoteModalHandler(true)
        addNoteMessageHandler(false)
    }

    // If edit note button selected
    const editNoteModal = () => {

    if(editNote == true) {
        editNoteHandler(false) // Open edit form
   }
   else {
    editNoteHandler(true) // Open edit form
       
     }

    }

    const handleNoteInputChange = (event) => {
        const { name, value } = event.target;
        updatedNoteHandler((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    //Update note in DB
    const updateNote = (e) => {

        e.preventDefault();

        const noteUpdated = async () => {
      
          try {
            
                if(updatedNote.title !== '' || 
                updatedNote.copy !== '')  {
      
                await updateDoc(doc(collection(db, "profile"), profile_id, 'notes', id), {
                    title: updatedNote.title.trim(),
                    copy: updatedNote.copy,

                });
      
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


    // Delete note after delete selected in warning
    const DeleteNote = () => {
    
        const docRef = doc(db, 'profile', profile_id, 'notes', id);
        deleteDoc(docRef)

        DeleteNoteWarningHandler(false)
        openNoteModalHandler(false)
    
}


    return (
        <>
            <NoteCard className='card'>
                <button className="flex justify-between w-full" onClick={openNote}><h4>{title}</h4><span>{FormatDate(publish_date, true)}</span></button>
            </NoteCard>

            { openNoteModal &&
                <Modal>
                    <div className='task__container'>
                        <div className='task__main'>
                            <div>
                        
                            {editNote ? 

                            <>
                            
                            <form className="mt-5 flex flex-col gap-6" onSubmit={updateNote}>
                                <div>
                                    <h2>Edit note</h2>
                                    <h3 className='my-3 font-bold'>Title</h3>
                                    <input 
                                    type="text" 
                                    name="title"
                                    defaultValue={updatedNote.title}
                                    onChange={handleNoteInputChange}
                                    />
                                    <Editor
                                        apiKey={text_api_key}
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={updatedNote.copy}
                                        onChange={(e) => { updatedNoteHandler({...updatedNote, copy: editorRef.current.getContent()}) }}
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
                                <div>
                                    <button type="submit" className='btn btn--submit'>Update note</button> 
                                </div>
                            </form> 
                            
                            </>

                            : 
                        
                            <>
                                <div className='flex justify-between items-center'>
                                    <h2>{title}</h2> 
                                    <button className="flex gap-2 items-center btn--reveal" onClick={editNoteModal}><PencilIcon/> <span>edit</span></button>
                                </div>
                                <div className='my-5'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }}></div>
                                </div>
                            
                            </>
                            }

                            </div>
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
                                        {FormatDate(publish_date, true)}
                                        </p>
                                        <p className="mb-5">Created by<br/> <b>NAME NEEDED</b></p>
                                    </div>
                                    </div>
                            </div>
                                <div className='task__button--danger'>
                                    <button className="btn btn--cancel mt-5" onClick={() => {DeleteNoteWarningHandler(true)}}>Delete note</button>
                                </div>
                        </div>
                        
                    </div>
                
                    <div className="overlay" onClick={() => {openNoteModalHandler(false), editNoteHandler(false)}}></div>

                    {addNoteMessage && <UpdateMessage copy="Note updated" />}

                </Modal> 
            }

            { deleteNoteWarning &&
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

        </>
    )
}

export default Note