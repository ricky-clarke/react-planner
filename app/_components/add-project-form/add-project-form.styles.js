import styled from 'styled-components';

export const ProfileFormContainer = styled.div`

        background-color:rgba(255, 255, 255, 0.8);
        display:flex;
        justify-content:flex-end;
        height:100%;
        inset:0 0 auto auto;
        position: fixed;
        width:100%;

    form {
        background-color:#e0e0e0;
        max-width:800px;
        padding:3em;
        width:100%;
        display:flex;
        flex-direction:column;

        h3 {
            font-size:2em;
            margin:0 0 1em 0;
        }

        input {
            margin-bottom:1em;
        }

    }

    .overlay {
        background-color:rgba(0,0,0,0.7);
        height:100%;
        inset:0;
        position:absolute;
        width:100%;
        z-index:-1;
    }

`;