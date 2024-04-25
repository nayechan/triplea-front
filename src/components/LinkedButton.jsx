// LinkedButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultButton from './DefaultButton';

const StyledLinkedButton = styled(DefaultButton)`
    background-color: black;
    color: white;

    &:hover {
        cursor: pointer;
        background-color: #666;
    }
`;

const LinkedButton = ({ className, children, to, onClick }) => {
    const navigate = useNavigate();
    const handleNextButton = () => {
        if(onClick){
            onClick();
        }
        navigate(to);
    };

    return (
        <StyledLinkedButton className={className} onClick={handleNextButton}>{children}</StyledLinkedButton>
    );
}

export default LinkedButton;
