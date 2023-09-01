import styled from 'styled-components';

export const UpdatedMessageContainer = styled.div`
    background-color: #03dffc;
    border-radius:5px;
    bottom:50px;
    left:50px;
    opacity:0.1;
    padding:1em;
    position:fixed;
    width:300px;
    animation: fadeUp 3s forwards;

    @keyframes fadeUp {
        0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
      }

    div {
        p {
            color:#10254A;
            margin:0;
        }
    }

`;
