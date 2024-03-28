import React from 'react';
import styled from 'styled-components';

const SideBar = styled.div`
    position: fixed;
    top: 0;
    left: ${({ position }) => position}; /* Dynamic width */;
    bottom: 0;
    background-color: #f0f0f0; /* Example background color */
    padding: 20px;
    overflow-y: auto; /* Enable scrolling if content exceeds sidebar height */
    z-index: 100;
    width: 25%;
    transition: width 0.3s ease; /* Smooth transition effect */
    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);

    /* Add additional styles as needed */
`;


export default SideBar;