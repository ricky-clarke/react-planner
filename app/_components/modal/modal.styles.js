import styled from 'styled-components';

export const ModalContainer = styled.div`
    height:100%;
    float:right;
    width:70%;
    
    .label {
        font-size:0.9em;
        font-weight:600;
        margin:0 0 0.5em 0;
    }

    form {
        height:100%;

        input, select, textarea {
            background-color:transparent;
            border:1px solid #21427a;
            border-radius:5px;
            margin-bottom:1em;
            padding:0.5em;
            width:100%;
        }

        select option {
            color:#000;
        }

    }

    .task__container {
        display:flex;
        flex-wrap:wrap;
        height:100%;
        justify-content: space-between;
        

        h2 {
            font-size:2em;
            margin:0;
            width:100%;
        }

        .task__main,
        .task__meta {
            padding:2em;
        }

        .task__main {
            background-color: #10254A;
            display:flex;
            flex-direction:column;
            gap: 1em;
            height:100%;
            overflow-y:auto;
            width:70%;

            label {
                position:absolute;
                left:-9999px;
                opacity:0;
            }

            .add_comment {
                padding:0; 
            }

            .tox-tinymce {
                margin-bottom:2em;
            }

        }

        .task__meta {
            background-color: #071020; 
            display:flex;
            height:100%;
            flex-direction:column;
            justify-content:space-between;
            font-size:0.9em;
            gap:1em;
            width:30%;

            &--top {
                display:flex;
                flex-direction:column;
                gap: 2em;
            }

        }

        .task__button {
            width:100%;

            &--danger {
                border-top:1px solid #03dffc;
                padding-bottom:1em;
                text-align:right;
            }

        }

    }

    .overlay {
        background-color:rgba(0,0,0,0.7);
        height:100%;
        inset:0;
        position:absolute;
        width:100%;
        z-index:-1;
        
        &--less-opacity {
            background-color:transparent;
        }

    }

`;