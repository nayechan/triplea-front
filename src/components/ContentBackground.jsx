import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const ContentBackground = styled.img`

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width:100%;
    height:100vh;
    object-fit: cover;
`;

export default ContentBackground;