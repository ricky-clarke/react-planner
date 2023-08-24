import styled from 'styled-components';

export const CommentCard = styled.div`
    display:flex;
    flex-direction: column;
    font-size:0.825rem;
    width:70%;

    &:nth-child(odd) {
        float:right;
    }

    .comment_copy {
        background-color: #10254A;
        border:1px solid #21427a;
        border-radius:5px; 
        margin-bottom:2em;
        padding:1em;  
        width:100%;
    }

    p {
        line-height:1.6em;
    }


`;

export const CommentCardMeta = styled.div`

    display:flex;
    justify-content:space-between;
    margin-bottom:0.5rem;

    div {
        display:flex;
        gap:0.5rem;
    }

    p {
        color:#fff;
        font-size:0.825rem;
        line-height:1.6em;
        opacity:0.6;
        margin:0;
    }

`;
