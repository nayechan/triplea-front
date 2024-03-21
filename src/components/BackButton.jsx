// NextButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const StyledBackButton = styled(Button)`
    background-color: #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    color: #000;
`;

const BackButton = () => {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <StyledBackButton onClick={handleBackButton}>이전</StyledBackButton>
    );
}

export default BackButton;
