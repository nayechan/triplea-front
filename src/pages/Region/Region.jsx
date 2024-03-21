import React from 'react';
import ContentTemplate from 'components/ContentsTemplate';
import NextButton from 'components/NextButton';
import 'styles/Region/Region.css';
import NewContentTemplate from 'components/NewContentsTemplate';
import LinkedButton from 'components/LinkedButton';

const Region = () => {
    return (
        <div className="region-container">
            <NewContentTemplate>
                <div className="region-contents">
                    <div className="region-top">
                        <h4>이번 여행, 어디로 떠날까?</h4>
                        <h1>가고 싶은 여행지를 선택하세요.</h1>
                    </div>
                    <ul className="region-lists">
                        <li>서울</li>
                        <li>부산</li>
                        <li>대구</li>
                        <li>인천</li>
                        <li>광주</li>
                        <li>대전</li>
                        <li>울산</li>
                        <li>세종</li>
                        <li>경기</li>
                        <li>강원</li>
                        <li>충북</li>
                        <li>충남</li>
                        <li>전북</li>
                        <li>전남</li>
                        <li>경북</li>
                        <li>경남</li>
                        <li>제주</li>
                    </ul>
                </div>
                <div className="region-buttons">
                    <LinkedButton to="/period">다음</LinkedButton>
                </div>
            </NewContentTemplate>
        </div>
    )
}
export default Region;