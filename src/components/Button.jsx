// NextButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.div`
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */

    width: 120px;
    height: 30px;
    

    border-radius: 10px;
    margin: 10px;
    padding: 10px;

    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    color: #000;
    transition: background-color 0.3s ease;

    text-align: center;

    &:hover {
        cursor: pointer;
    }

    > p{
        display: inline;
        margin: auto;
    }
`;

const Button = ({className, children, onClick}) => {

    return (
        <StyledButton className={className} onClick={onClick}>
            <p>{children}</p>
        </StyledButton>
    );
}

export default Button;
