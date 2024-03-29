import React, { useState } from 'react';
import 'styles/Region/Region.css';
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';

const Region = () => {
    const { setSelectedRegion } = useSelectedRegionContext();
    const { lastSelectedRegion, setLastSelectedRegion } = useState(null);

    const handleRegionSelect = (region) => {
        setLastSelectedRegion(region);
        console.log(region);
    };

    const handleNextButtonClick = () => {
        if(lastSelectedRegion !== null){
            setSelectedRegion(lastSelectedRegion);
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
                        <li onClick={()=> handleRegionSelect('서울')}>서울</li>
                        <li onClick={()=> handleRegionSelect('서울')}>부산</li>
                        <li onClick={()=> handleRegionSelect('서울')}>대구</li>
                        <li onClick={()=> handleRegionSelect('서울')}>인천</li>
                        <li onClick={()=> handleRegionSelect('서울')}>광주</li>
                        <li onClick={()=> handleRegionSelect('서울')}>대전</li>
                        <li onClick={()=> handleRegionSelect('서울')}>울산</li>
                        <li onClick={()=> handleRegionSelect('서울')}>세종</li>
                        <li onClick={()=> handleRegionSelect('서울')}>경기</li>
                        <li onClick={()=> handleRegionSelect('서울')}>강원</li>
                        <li onClick={()=> handleRegionSelect('서울')}>충북</li>
                        <li onClick={()=> handleRegionSelect('서울')}>충남</li>
                        <li onClick={()=> handleRegionSelect('서울')}>전북</li>
                        <li onClick={()=> handleRegionSelect('서울')}>전남</li>
                        <li onClick={()=> handleRegionSelect('서울')}>경북</li>
                        <li onClick={()=> handleRegionSelect('서울')}>경남</li>
                        <li onClick={()=> handleRegionSelect('서울')}>제주</li>
                    </ul>
                </div>
                <div className="region-buttons">
                    <LinkedButton to="/period" onClick={handleNextButtonClick}>다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}
export default Region;