// NextButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled component for the Next Button
const StyledNextButton = styled.div`
    border-radius: 10px;
    padding: 13px 95px;
    background-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    color: #fff;
    transition: background-color 0.3s ease;
    z-index: 100;
    position: absolute;
    bottom: 90px; /* 원하는 위치로 조정 */
    right: 297px;
    &:hover {
        cursor: pointer;
    }
`;

const NextButton = ({ to }) => {
    const navigate = useNavigate();
    const handleNextButton = () => {
        navigate(to);
    };

    return (
        <StyledNextButton onClick={handleNextButton}>다음</StyledNextButton>
    );
}

export default NextButton;
