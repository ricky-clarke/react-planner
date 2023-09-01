import styled from 'styled-components';

export const ProjectRowContainer = styled.section`
    background-color: #10254A;
    border:2px solid #071020;
    border-radius: 5px;
   
    &:hover {
        border:2px solid #03dffc;
        border-radius:5px;
        cursor:pointer;
    }

    h3 {
        flex-grow:1;
        font-weight:600;
        margin:0;
        padding:1em;
    }

    a {
        height:100%;
        inset:0;
        position:absolute;
        width:100%;
    }

`;
