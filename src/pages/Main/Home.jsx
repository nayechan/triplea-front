import React from 'react';
import Header from 'components/Header';

import LinkedButton from 'components/LinkedButton';
import styled from 'styled-components';

import ContentBackground from 'components/ContentBackground';


const HomeRegionContents = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: calc(100vh - 200px);
    margin: 80px 0 0 32px;

    & h1{
        font-family: "Noto Serif";
        font-size: 3em;
    }

    @media screen and (max-width: 1450px) {
        width: 450px;
        margin: 80px 0 0 28px;
        font-size: 0.75em;
    }

    @media screen and (max-width: 1000px) {
        width: 360px;
        margin: 80px 0 0 28px;
        font-size: 0.75em;
    }

    @media screen and (max-width: 768px) {
        width: 300px;
        margin: 80px 0 0 24px;
        font-size: 0.75em;
    }

    @media screen and (max-width: 640px) {
        width: 220px;
        margin: 80px 0 0 16px;
        font-size: 0.6em;
    }

    @media screen and (max-width: 480px) {
        width: 160px;
        margin: 80px 0 0 16px;
        font-size: 0.6em;
    }
`;

const StyledBackground = styled(ContentBackground)`
    width: 100%;
    height: 100%;
`

const StyledLinkedButton = styled(LinkedButton)`
    background-color: #364;

    &:hover {
        cursor: pointer;
        background-color: #142;
    }

    width: 240px;
    height: 50px;

    font-size: 26px;
`;

const Home = () => {

    return (
        <div id="home-container">
            <div className="home-contents">
                <Header/>
                <HomeRegionContents>
                    <div className='home-content-title' style={{flex: 1}}>
                        <h1 style={{color: "#afd"}}>Trip:lenner</h1>
                        <h2 style={{color: "#efd"}}>쉽고 빠른 여행 일정표 생성 및 편집</h2>
                        <h3 style={{color: "#fff"}}>
                            TripPlanner는 여행을 더욱 편리하고 즐겁게 만들어주는 웹 서비스입니다. 
                            강도, 여행지, 숙소 위치와 같은 여러 요인을 고려하여 자동으로 최적의 여행 경로를 추천하고 생성합니다. 
                            또한 사용자는 생성된 경로를 자유롭게 편집하고 수정하여 자신만의 완벽한 여행 일정을 만들 수 있습니다. 
                            TripPlanner와 함께라면 여행 계획을 세우는 과정이 즐거운 여정이 될 것입니다.
                        </h3>
                    </div>
                    <StyledLinkedButton to="/region">
                        시작하기
                    </StyledLinkedButton>
                </HomeRegionContents>
                <StyledBackground src={`${process.env.PUBLIC_URL}/images/template-new.png`} alt="이미지 설명"/>
            </div>
        </div>
    );
};

export default Home;
 