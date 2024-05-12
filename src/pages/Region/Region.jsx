import React, { useState } from 'react';
import 'styles/Region/Region.css';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';

const Region = () => {
    const [lastSelectedRegion, setLastSelectedRegion] = useState(null);

    const handleRegionSelect = (region) => {
        // 선택한 지역이 다른 지역과 같지 않은 경우 (다른 지역을 선택한 경우)
        if (lastSelectedRegion !== region) {
            // 이전에 선택한 지역이 null이 아닌 경우 (이미 선택된 지역이 있는 경우)
            if (lastSelectedRegion != null) {
                console.log(`${lastSelectedRegion} deselected`);
            }
            setLastSelectedRegion(region);
            console.log(`${region} selected`);
        } else { // 선택한 지역을 다시 선택한 경우
            console.log(`${lastSelectedRegion} deselected`);
            setLastSelectedRegion(null); // 선택한 지역을 해제
        }
    }

    const handleNextButtonClick = () => {
        if (lastSelectedRegion != null) { // 선택한 지역이 있는 경우
            console.log(`${lastSelectedRegion} last selected`);
        }else{ // 선택한 지역이 없을 경우
            alert("지역을 선택해주세요.")
        }
    };

    return (
        <div className="region-container">
            <ContentTemplate>
                <div className="region-contents">
                    <div className="region-top">
                        <h4>이번 여행, 어디로 떠날까?</h4>
                        <h1>가고 싶은 여행지를 선택하세요.</h1>
                    </div>
                    <ul className="region-lists">
                        <li onClick={() => handleRegionSelect('서울')} className={lastSelectedRegion === '서울' ? 'selected' : ''}>서울</li>
                        <li onClick={() => handleRegionSelect('부산')} className={lastSelectedRegion === '부산' ? 'selected' : ''}>부산</li>
                        <li onClick={() => handleRegionSelect('대구')} className={lastSelectedRegion === '대구' ? 'selected' : ''}>대구</li>
                        <li onClick={() => handleRegionSelect('인천')} className={lastSelectedRegion === '인천' ? 'selected' : ''}>인천</li>
                        <li onClick={() => handleRegionSelect('광주')} className={lastSelectedRegion === '광주' ? 'selected' : ''}>광주</li>
                        <li onClick={() => handleRegionSelect('대전')} className={lastSelectedRegion === '대전' ? 'selected' : ''}>대전</li>
                        <li onClick={() => handleRegionSelect('울산')} className={lastSelectedRegion === '울산' ? 'selected' : ''}>울산</li>
                        <li onClick={() => handleRegionSelect('세종')} className={lastSelectedRegion === '세종' ? 'selected' : ''}>세종</li>
                        <li onClick={() => handleRegionSelect('경기')} className={lastSelectedRegion === '경기' ? 'selected' : ''}>경기</li>
                        <li onClick={() => handleRegionSelect('강원')} className={lastSelectedRegion === '강원' ? 'selected' : ''}>강원</li>
                        <li onClick={() => handleRegionSelect('충북')} className={lastSelectedRegion === '충북' ? 'selected' : ''}>충북</li>
                        <li onClick={() => handleRegionSelect('충남')} className={lastSelectedRegion === '충남' ? 'selected' : ''}>충남</li>
                        <li onClick={() => handleRegionSelect('전북')} className={lastSelectedRegion === '전북' ? 'selected' : ''}>전북</li>
                        <li onClick={() => handleRegionSelect('전남')} className={lastSelectedRegion === '전남' ? 'selected' : ''}>전남</li>
                        <li onClick={() => handleRegionSelect('경북')} className={lastSelectedRegion === '경북' ? 'selected' : ''}>경북</li>
                        <li onClick={() => handleRegionSelect('경남')} className={lastSelectedRegion === '경남' ? 'selected' : ''}>경남</li>
                        <li onClick={() => handleRegionSelect('제주')} className={lastSelectedRegion === '제주' ? 'selected' : ''}>제주</li>
                    </ul>
                </div>
                <div className="region-buttons">
                    <LinkedButton 
                        to={{
                            pathname: lastSelectedRegion ? "/period" : "/region",
                            search: lastSelectedRegion ? `?region=${lastSelectedRegion}` : ''
                        }} 
                        onClick={handleNextButtonClick}
                    >
                        다음
                    </LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}
export default Region;