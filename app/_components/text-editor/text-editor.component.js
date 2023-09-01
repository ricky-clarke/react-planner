// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';

// const TextEditor = (props) => {

//     const editorRef = useRef(null);
//     const text_api_key = `${process.env.NEXT_PUBLIC_TINYMCE}`;

//     const {initial_value, placeholder} = props


// //     const log = () => {
// //     if (editorRef.current) {
// //         console.log(editorRef.current.getContent());
// //     }
// //   };

//     return(
//         <>
//             <Editor
//             apiKey={text_api_key}
//             onInit={(evt, editor) => editorRef.current = editor}
//        //     onChange={(e) => { editedTaskHandler({...editedTask, description: editorRef.current.getContent()}) }}
//             initialValue={initial_value}
//             init={{
//             height: 300,
//             menubar: false,
//             plugins: [
//             'advlist','autolink', 'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','fullscreen','insertdatetime','media','table','help','wordcount'
//             ],
//             toolbar: 'link undo redo | casechange blocks | bold italic backcolor | ' +
//             'alignleft aligncenter alignright alignjustify | ' +
//             'bullist numlist checklist | removeformat | a11ycheck code'
//             }}
//             />
//     </>
//     )

// }

// export default TextEditor;