import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import ContentBackground from './ContentBackground';

const ContentWrapper = styled.div`
    width: 1200px;
    min-height: 700px;

    padding: 20px; /* Adjust padding as needed */
    margin: 40px auto; /* 헤더와 상단 마진 설정 */
    background-color: #e3ece8;
    border-radius: 10px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* Make content scrollable */
    overflow-y: auto;
    max-height: calc(100vh - 160px); /* Adjust max height as needed */

    /* Hide scrollbar for Chrome, Safari, and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge, and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const StyledHeader = styled(Header)`
    background-color: white;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.3);
`;

const NewContentTemplate = ({className, children}) => {
    return (
        <div className="template-contents">
            <StyledHeader />

            <ContentWrapper className={className}>
                {children} {/* Region 컴포넌트를 props.children을 통해 렌더링합니다. */}
            </ContentWrapper>

            <ContentBackground src={`${process.env.PUBLIC_URL}/images/category-background.jpg`} alt="이미지 설명"/>
        </div>        
    );
}

export default NewContentTemplate;
