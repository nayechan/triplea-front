// NextButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBackButton = styled.div`
    border-radius: 10px;
    padding: 13px 95px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    color: #000;
    transition: background-color 0.3s ease;
    z-index: 100;
    position: absolute;
    bottom: 90px; /* 원하는 위치로 조정 */
    left: 297px;
    &:hover {
        cursor: pointer;
    }
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
