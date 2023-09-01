import styled from 'styled-components';

export const ClientDashboardGrid = styled.div`

    display: grid;
    grid-template-columns: 1fr 500px;
    grid-template-rows: auto 1fr;
    gap:2.5em;

    .dashboard__projects {
        grid-row: 1 / 3;
    }

    .dashboard__notes {
        grid-column : 2;
    }

    .dashboard__card {
        background:red;
    }

 }
    
`;
