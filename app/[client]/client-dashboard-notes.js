import styled from 'styled-components';

export const NotesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap:4em;
    margin:3em 0;
`;

export const Note = styled.div`
    background-color:#10254A;
    border:2px solid #10254A;
    border-radius:5px;
    padding:1em;

    &:hover {
        border:2px solid #03dffc;
        cursor:pointer;
    }

    h3 {
        font-size:1.3em;
        margin:0 0 0.5em 0;
    }

    p {
        font-size:0.9em;
        line-height:1.6em;
        margin-bottom:1em;
    }

`;

export const NoteMeta = styled.div`

    border-top: 1px solid #071020;
    display:flex;
    justify-content: space-between;
    font-size: 0.8em;
    margin-top: 0.5em;
    padding-top: 0.5em;
    text-align: right;

    p {
    display:flex;
    gap:1rem;
    margin:0;

    span {
        display:flex;
        gap:0.2rem;
    }

    }

`;


