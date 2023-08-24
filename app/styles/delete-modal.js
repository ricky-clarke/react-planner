import styled from 'styled-components';

export const DeleteModal = styled.section`

align-items: center;
display:flex;
height:100%;
justify-content:center;
inset:0;
position: fixed;
width:100%;

&:after {
    background-color: rgba(0,0,0, 0.7);
    content:"";
    height:100%;
    inset: 0 0 auto auto;
    position:absolute;
    width:100%;
}

> div {
    background-color:#10254A;
    border-radius:5px;
    max-width:500px;
    padding:2em;
    position:relative;
    width:100%;
    z-index:1;

    h3 {
        font-size:1.2em;   
        font-weight:500;
    }

    > div {
        display:flex;
        gap:1em;
        margin-top:1.5em;
    }

}


`;