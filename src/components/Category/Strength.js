import React from 'react';
import ContentTemplate from '../ContentsTemplate';
import NextButton from "../NextButton";
import BackButton from "../BackButton";
import './Strength.css';

const Strength = () => {
    return (
        <div className="strength-container">
            <ContentTemplate >
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
            </ContentTemplate>
            <NextButton to="/" />
            <BackButton />
        </div>
    )
}
export default Strength;