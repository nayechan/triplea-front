import React from 'react';
import ContentTemplate from 'components/ContentsTemplate';
import LinkedButton from 'components/LinkedButton';
import BackButton from "components/BackButton";
import 'styles/Strength/Strength.css';




const Strength = () => {
    return (
        <div className="strength-container">
            <ContentTemplate >
                <div className="strength-contents">
                    <div className="strength-top">
                        <h1>여행 강도를 선택해주세요.</h1>
                    </div>
                    <ul className="strength-lists">
                        <li>
                            <img src={process.env.PUBLIC_URL + '/images/strength_weak.png'} alt="이미지 설명" className="strength-image" />
                            약함
                        </li>
                        <li>
                            <img src={process.env.PUBLIC_URL + '/images/strength_normal.png'} alt="이미지 설명" className="strength-image" />
                            중간
                        </li>
                        <li>
                            <img src={process.env.PUBLIC_URL + '/images/strength_strong.png'} alt="이미지 설명" className="strength-image" />
                            강함
                        </li>
                    </ul>
                </div>
                <div className="strength-buttons">
                    <BackButton />
                    <LinkedButton to="/resultRoute">다음</LinkedButton>
                </div>
            </ContentTemplate>
        </div>
    )
}
export default Strength;