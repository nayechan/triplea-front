import React from 'react';
import styled from 'styled-components';
import Header from './Main/Header';

const StyledTemplate = styled.div`
    width: 1150px;
    height: 550px;
    margin: 100px auto 32px; /* 헤더와 상단 마진 설정 */
    position: absolute; /* 절대적 위치 설정 */
    top: 285px;
    left: 50%;
    transform: translate(-50%, -50%); /* 요소를 수평 및 수직으로 중앙에 정렬 */
    background-color: #e3ece8;
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center; /* 수직 방향으로 중앙 정렬 */
    z-index: 1;
`;
const StyledHeader = styled(Header)`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
`;

const ContentTemplate = ({children}) => {
    return (
        <div className="template-contents">
            <StyledHeader />
            <div className="header-placeholder" style={{height: '70px'}}></div>
            <StyledTemplate />
            <img src={process.env.PUBLIC_URL + '/images/category-background.jpg'} alt="이미지 설명" className="background-image" style={{position: 'fixed'}}/>
            {children} {/* Region 컴포넌트를 props.children을 통해 렌더링합니다. */}
            
        </div>
        
    );
}

export default ContentTemplate;
