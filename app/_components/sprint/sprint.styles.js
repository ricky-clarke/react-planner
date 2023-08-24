import styled from 'styled-components';

export const SprintColumn = styled.div`

    .sprint__column__top {
        background-color:#071020;
        border:1px solid #10254A;
        border-radius:5px;
        max-height: calc(100vh - 210px);
        overflow: auto;
        margin-bottom:0.5rem;
        padding:1rem;
    }

    h2 {
        font-size:1.1rem;
    }

    button {
        background-color: transparent;
        font-size:0.825rem;
        padding:0;

        &:hover {
            color:#03dffc;
        }

    }

`;

export const SprintColumnCard = styled.div`
  background-color: #10254A;
  border:2px solid #071020;
  border-radius: 5px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  position:relative;
  margin-top: 1rem;

&:hover {
  border:2px solid #03dffc;
  cursor:pointer;
}

h3 {
  font-size: 0.9em;
  margin: 0;
  padding:0.25em;
}
`;

export const TaskCardMeta = styled.div`
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

    svg {

      width:15px;

      path {
        fill: #999;
      }
    }

  }

`;

export const CommentListContainer = styled.div` 
    border-top:1px solid #10254A;   
    margin-top:1em;
    padding-top:2em;
`;
