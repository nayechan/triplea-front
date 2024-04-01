import React, { useState } from 'react';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from "components/BackButton";
import 'styles/Strength/Strength.css';
import { useSelectedStrengthContext } from 'contexts/SelectedStrengthContext';

const Strength = () => {
    const { setSelectedStrength } = useSelectedStrengthContext();
    const [lastSelectedStrength, setLastSelectedStrength] = useState(null);

    const handleStrengthSelect = (strength) => {
        setLastSelectedStrength(strength);
    };

    const handleNextButtonClick = () => {
        if(lastSelectedStrength !== null){
            setSelectedStrength(lastSelectedStrength);
            console.log(`${lastSelectedStrength} last`);
        }
    };

    return (
        <div className="strength-container">
            <ContentTemplate >
                <div className="strength-contents">
                    <div className="strength-top">
                        <h1>여행 강도를 선택해주세요.</h1>
                    </div>
                    <ul className="strength-lists">
                        <li >
                            <img src={process.env.PUBLIC_URL + '/images/strength_weak.png'} onClick={() => handleStrengthSelect('weak')} className={lastSelectedStrength === 'weak' ? 'selected' : ''} alt="이미지 설명"/>
                            약함
                        </li>
                        <li >
                            <img src={process.env.PUBLIC_URL + '/images/strength_normal.png'} onClick={() => handleStrengthSelect('normal')} className={lastSelectedStrength === 'normal' ? 'selected' : ''} alt="이미지 설명" />
                            중간
                        </li>
                        <li >
                            <img src={process.env.PUBLIC_URL + '/images/strength_strong.png'} onClick={() => handleStrengthSelect('hard')} className={lastSelectedStrength === 'hard' ? 'selected' : ''} alt="이미지 설명" />
                            강함
                        </li>
                    </ul>
                </div>
                <div className="strength-buttons">
                    <BackButton />
                    <LinkedButton to="/resultRoute" onClick={handleNextButtonClick}>다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}
export default Strength;