import styled from "styled-components";

export const TaskCardStyle = styled.div`
  background-color: #e0e0e0;
  border:2px solid #e0e0e0;
  border-radius: 5px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  position:relative;
  margin-top: 1rem;

  &:hover {
    border:2px solid #ccc;
    cursor:pointer;
  }

  h3 {
    font-size: 0.9em;
    margin: 0;
    padding:0.25em;
  }

`;

export const TaskCardMeta = styled.div`
  border-top: 1px solid #eee;
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

export const TaskCardCreateTask= styled.div`
  background:red;
  padding:1em;
`;

export const TaskCardOpen = styled.button`
  height:100%;
  position:absolute;
  inset:0;
  width:100%;
`;
