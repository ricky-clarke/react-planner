import styled from 'styled-components';

export const SprintColumnTop = styled.div`
    max-height: calc(100vh - 210px);
    overflow: auto;
    margin-bottom:0.5rem;
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


&.spint_completed {
  // background-color:#03dffc;
  //color:#10254A;
  opacity:0.6;

  &:hover {
    opacity:1;
  }

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

export const SprintColumnButton = styled.div`
  button {
    background-color: transparent;
    display:flex;
    font-size:0.825rem;
    padding:0;

    &:before{ 
      background-color:green;
      border-radius:50%;
      content:"+";
      color:#fff;
      display:inline-block;
      font-size:1.1em;
      line-height: 14px;
      margin-right:0.25em;
      height:15px;
      width:15px;
    }

    span {
      opacity:0;
      transform:translateX(-15px);
      transition:0.3s ease all;

    }
    
    &:hover span{
      opacity:1;
      transform:translateX(0);
      transition:0.3s ease all;
    }
    
  }
`;

export const CommentListContainer = styled.div` 
    border-top:1px solid #10254A;   
    margin-top:1em;
    padding-top:2em;
`;