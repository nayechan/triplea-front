import React from 'react';
import styled from 'styled-components';

import Sidebar from './Sidebar';

const SidebarContainer = styled.div`
    position: absolute;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: calc(50vh - 64px);
    left: ${({ isOpen, pos }) => (isOpen ? `calc(25vw + 56px)` : '0')}; /* Adjust button position based on sidebar state */
    transform: translateY(-50%);
    z-index: 101;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const ArrowIcon = styled.div`
    width: 20px;
    height: 20px;
    border: solid ${({ isOpen }) => (isOpen ? '#000' : '#111')};
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(${({ isOpen }) => (isOpen ? '135deg' : '-45deg')});
`;

const ShrinkableSidebar = ({ isOpen, toggleSidebar, width, children, className }) => {
    const handleClick = () => {
        toggleSidebar(); // Toggle the sidebar state when the button is clicked
    };

    return (
        <SidebarContainer>
            <Sidebar position={isOpen ? '0%' : '-30%'} className={className}>
                {children}
            </Sidebar>
            <ToggleButton isOpen={isOpen} onClick={handleClick}>
                <ArrowIcon isOpen={isOpen} />
            </ToggleButton>
        </SidebarContainer>
    );
};

export default ShrinkableSidebar;
