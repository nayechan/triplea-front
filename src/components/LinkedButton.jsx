import React from 'react';
import { Link } from 'react-router-dom';
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

const LinkedButton = ({ className, children, to, state, onClick }) => {
    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Link to={{ pathname: to, state }} className={className} onClick={handleButtonClick}>
            <StyledLinkedButton>{children}</StyledLinkedButton>
        </Link>
    );
}

export default LinkedButton;
