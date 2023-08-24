import styled from 'styled-components';

export const ProfileRowContainer = styled.section`
    background-color: #10254A;
    border:2px solid #071020;
    border-radius: 5px;
    padding:1em;
    position:relative;

    &:hover {
        border:2px solid #03dffc;
        cursor:pointer;
    }

    h2 {
        font-weight:600;
        margin:0;
    }

    a {
        height:100%;
        inset:0;
        position:absolute;
        width:100%;
    }

`;
