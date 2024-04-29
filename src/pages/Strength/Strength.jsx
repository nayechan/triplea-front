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
        if (lastSelectedStrength != strength) {
            // 이전에 선택한 강도가 null이 아닌 경우 (이미 선택된 강도가 있는 경우)
            if (lastSelectedStrength != null) {
                console.log(`${lastSelectedStrength} deselected`);
            }
            setLastSelectedStrength(strength);
            console.log(`${strength} selected`);
        } else { // 선택한 강도를 다시 선택한 경우
            console.log(`${lastSelectedStrength} deselected`);
            setLastSelectedStrength(null); // 선택한 강도를 해제
        }
    };

    const handleNextButtonClick = () => {
        if(lastSelectedStrength != null){
            setSelectedStrength(lastSelectedStrength);
            console.log(`${lastSelectedStrength} last`);
        }else{
            alert("강도를 선택해주세요.")
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
                        <li onClick={() => handleStrengthSelect('weak')} 
                        className={lastSelectedStrength === 'weak' ? 'selected' : ''} >
                            <img src={process.env.PUBLIC_URL + '/images/strength_weak.png'} alt="이미지 설명" style={{ width: '150px' }}/>
                            약함
                        </li>
                        <li onClick={() => handleStrengthSelect('normal')}
                        className={lastSelectedStrength === 'normal' ? 'selected' : ''} >
                            <img src={process.env.PUBLIC_URL + '/images/strength_normal.png'} alt="이미지 설명" style={{ width: '150px' }}/>
                            중간
                        </li>
                        <li onClick={() => handleStrengthSelect('hard')} className={lastSelectedStrength === 'hard' ? 'selected' : ''} >
                            <img src={process.env.PUBLIC_URL + '/images/strength_strong.png'} alt="이미지 설명" style={{ width: '150px' }}/>
                            강함
                        </li>
                    </ul>
                </div>
                <div className="strength-buttons">
                    <BackButton />
                    <LinkedButton to={lastSelectedStrength ? "/residence" : "/strength"} onClick={handleNextButtonClick}>다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}
export default Strength;