import React from 'react';
import ContentTemplate from 'components/ContentsTemplate';
import NewContentTemplate from 'components/NewContentsTemplate';
import NextButton from "components/NextButton";
import LinkedButton from 'components/LinkedButton';
import BackButton from "components/BackButton";
import 'styles/Strength/Strength.css';

const Strength = () => {
    return (
        <div className="strength-container">
            <NewContentTemplate >
                <div className="strength-contents">
                    <div className="strength-top">
                        <h1>여행 강도를 선택해주세요.</h1>
                    </div>
                    <ul className="strength-lists">
                        <li>약함</li>
                        <li>중간</li>
                        <li>강함</li>
                    </ul>
                </div>
                <div className="strength-buttons">
                    <BackButton />
                    <LinkedButton to="/resultRoute">다음</LinkedButton>
                </div>
            </NewContentTemplate>
        </div>
    )
}
export default Strength;