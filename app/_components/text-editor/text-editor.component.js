// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// const TextEditor = () => {

//     const editorRef = useRef(null);
//     const log = () => {
//     if (editorRef.current) {
//         console.log(editorRef.current.getContent());
//     }
//   };

//     return(
//         <>
//         <Editor
//         apiKey="djgjx6t37zoqxtoml83855c5n48wf0and2mh3qvzfa39u7uo"
//         onInit={(evt, editor) => editorRef.current = editor}
//         initialValue="<p>Description</p>"
//         init={{
//         height: 300,
//         menubar: false,
//         plugins: [
//            'advlist','advcode','advtable','autolink','checklist','export',
//            'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
//            'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
//         ],
//         toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
//            'alignleft aligncenter alignright alignjustify | ' +
//            'bullist numlist checklist | removeformat | a11ycheck code table help'
//         // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//         }}
//     />
//     {/* <button onClick={log}>Log editor content</button> */}
//     </>
//     )

// }

// export default TextEditor;