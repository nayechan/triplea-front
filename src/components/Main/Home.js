import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const HomeRegionContents = styled.div`
    position: absolute;
    top: 433px;
    left: 135px;
    font-size: 1.4em;
`;

const StyledLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: #456e5f;
    }
`;

const BackgroundImage = styled.img`
    height: 690px;
    width: 100%;
`;

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div id="home-container">
            <div className="home-contents">
                <Header />
                <HomeRegionContents>
                    <StyledLink to="/region" hovered={isHovered} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>여행지 선택하기</StyledLink>
                </HomeRegionContents>
                <BackgroundImage src={process.env.PUBLIC_URL + '/images/template.png'} alt="이미지 설명" />
            </div>
        </div>
    );
};

export default Home;
