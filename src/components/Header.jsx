import React, { useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'styles/Header/Header.css';

const Header = ({className}) => {
    const inputRef = useRef(null);
    const handleSearchIconClick = () => {
        inputRef.current.focus();
    };

    return (
        <header className={className}>
            <div className="header-contents">
                <div className="header-image">
                    <Link to="/"><b>Trip:lenner</b></Link>
                </div>
                <div className="header-menu">
                    <div className="header-button">
                        <div className="header-menu-button">
                            <ul className="menu-button">
                                <li className="travel-button">
                                    <Link to="/region">여행지</Link>
                                </li>
                                <li className="hotel-button">
                                    <Link to="https://www.agoda.com" target="_blank">숙소</Link>
                                </li>
                                <li className="community-button">
                                    <Link to="/boardList">게시판</Link>
                                </li>
                                <li className="contact-button">
                                    <Link to="https://www.naver.com" target="_blank">문의</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
