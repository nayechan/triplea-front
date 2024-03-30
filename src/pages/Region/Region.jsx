import React, { useState } from 'react';
import 'styles/Region/Region.css';
import { useSelectedRegionContext } from 'contexts/SelectedRegionContext';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';

const Region = () => {
    const { setSelectedRegion } = useSelectedRegionContext();
    const [ lastSelectedRegion, setLastSelectedRegion ] = useState(null);

    const handleRegionSelect = (region) => {
        setLastSelectedRegion(region);
        console.log(region);
    };

    const handleNextButtonClick = () => {
        if(lastSelectedRegion !== null){
            setSelectedRegion(lastSelectedRegion);
            console.log(`${lastSelectedRegion} last`);
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
                        <li onClick={()=> handleRegionSelect('부산')}>부산</li>
                        <li onClick={()=> handleRegionSelect('대구')}>대구</li>
                        <li onClick={()=> handleRegionSelect('인천')}>인천</li>
                        <li onClick={()=> handleRegionSelect('광주')}>광주</li>
                        <li onClick={()=> handleRegionSelect('대전')}>대전</li>
                        <li onClick={()=> handleRegionSelect('울산')}>울산</li>
                        <li onClick={()=> handleRegionSelect('세종')}>세종</li>
                        <li onClick={()=> handleRegionSelect('경기')}>경기</li>
                        <li onClick={()=> handleRegionSelect('강원')}>강원</li>
                        <li onClick={()=> handleRegionSelect('충북')}>충북</li>
                        <li onClick={()=> handleRegionSelect('충남')}>충남</li>
                        <li onClick={()=> handleRegionSelect('전북')}>전북</li>
                        <li onClick={()=> handleRegionSelect('전남')}>전남</li>
                        <li onClick={()=> handleRegionSelect('경북')}>경북</li>
                        <li onClick={()=> handleRegionSelect('경남')}>경남</li>
                        <li onClick={()=> handleRegionSelect('제주')}>제주</li>
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