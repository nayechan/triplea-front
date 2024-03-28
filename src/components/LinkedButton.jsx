// LinkedButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultButton from './DefaultButton';

const StyledLinkedButton = styled(DefaultButton)`
    background-color: black;
    color: white;
`;

const LinkedButton = ({ className, children, to }) => {
    const navigate = useNavigate();
    const handleNextButton = () => {
        navigate(to);
    };

    return (
        <StyledLinkedButton className={className} onClick={handleNextButton}>{children}</StyledLinkedButton>
    );
}

export default LinkedButton;
