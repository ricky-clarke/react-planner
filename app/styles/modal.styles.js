import styled from 'styled-components';

export const Modal = styled.section`

background-color: rgba(0,0,0, 0.7);
display:flex;
justify-content:flex-end;
height:100%;
inset:0 0 auto auto;
position: fixed;
width:100%;

form {
    background-color:#10254A;
    max-width:800px;
    padding:3em;
    width:100%;
    display:flex;
    flex-direction:column;

    h2 {
        font-size:2em;
        margin:0 0 1em 0;
    }

    input {
        background-color:transparent;
        border:1px solid #fff;
        margin-bottom:1em;
        padding:0.5em;
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