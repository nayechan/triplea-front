import React, { useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'styles/Header/Header.css';

const Header = () => {
    const inputRef = useRef(null);
    const handleSearchIconClick = () => {
        inputRef.current.focus();
    };

    return (
        <header id="header-container">
            <div className="header-contents">
                <div className="header-image">
                    <Link to="/">Trip:lanner</Link>
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
                                    <Link to="https://www.naver.com" target="_blank">게시판</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header-search">
                    <span className="search-bar">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="가고 싶은 지역을 입력하세요."
                        />
                        <FaSearch
                            size={24}
                            onClick={handleSearchIconClick}
                            className="search-icon"
                        />
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
