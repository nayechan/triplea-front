import React, { useState } from 'react';
import Header from 'components/Header';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ContentBackground from 'components/ContentBackground';


const HomeRegionContents = styled.div`
    position: absolute;
    top: calc(85% - 70px);
    left: 70px;
    font-size: 1.4em;
`;

const StyledLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: #456e5f;
    }

    background-color: #EAC6AC;
    padding: 20px;
    border-radius: 20px;

`;

const StyledBackground = styled(ContentBackground)`
    width: 100%;
`

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div id="home-container">
            <div className="home-contents">
                <Header/>
                <HomeRegionContents>
                    <StyledLink to="/region" hovered={isHovered} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>여행지 선택하기</StyledLink>
                </HomeRegionContents>
                <StyledBackground src={`${process.env.PUBLIC_URL}/images/template.png`} alt="이미지 설명"/>
            </div>
        </div>
    );
};

export default Home;
