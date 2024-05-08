import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';

const StyledBoard = styled.div`
    width: 1200px;
    padding: 20px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledHeader = styled(Header)`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const StyledTop = styled.h2`
    font-size: 2em;
    margin-bottom: 20px;
    text-align: center;
`;

const StyledLinkWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledLink = styled(Link)`
    display: block;
    width: 150px;
    padding: 10px;
    text-align: center;
    background-color: #088A68;
    color: white;
    text-decoration: none;
    border-radius: 5px;
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
`;

const StyledListItemHeader = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid #070719;
    margin-bottom: 10px;
    font-weight: bold;
    li {
        flex: 1;
        text-align: center;
    }
    li:first-child {
        flex: 0.5;
        text-align: left;
    }
    li:last-child {
        flex: 0.5;
        text-align: right;
    }
`;

const StyledListItem = styled.li`
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 0.5px solid #070719;
    margin-bottom: 10px;
    li {
        flex: 1;
        text-align: center;
    }
    li:first-child {
        flex: 0.5;
        text-align: left;
    }
    li:last-child {
        flex: 0.5;
        text-align: right;
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;
    }
`;

const Pagination = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    background-color: transparent;
    color: black;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BoardList = () => {
    // 임의의 게시물 데이터
    const [posts, setPosts] = useState([
        { id: 1, title: '첫 번째 글', name: '익명', date: '2024-04-18', content: '첫 번째 글 내용입니다.', password: '1234' },
        { id: 2, title: '두 번째 글', name: '익명', date: '2024-04-17', content: '두 번째 글 내용입니다.', password: '5678' },
        { id: 3, title: '세 번째 글', name: '익명', date: '2024-04-16', content: '세 번째 글 내용입니다.', password: '9012' },
    ]);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    // 현재 페이지의 게시글 목록
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="boardList-container">
            <StyledHeader />
            <StyledBoard className="boardList-contents">
                <StyledTop>게시판</StyledTop>
                <StyledLinkWrapper>
                    <StyledLink to="/boardPost">게시글 작성하기</StyledLink>
                </StyledLinkWrapper>
                <StyledList>
                    <StyledListItemHeader>
                        <li>아이디</li>
                        <li>내용</li>
                        <li>작성자</li>
                        <li>작성일</li>
                    </StyledListItemHeader>
                    {currentPosts.map(post => (
                        <StyledListItem key={post.id}>
                            <Link to={`/post/${post.id}`}>
                                <li>{post.id}</li>
                                <li>{post.title}</li>
                                <li>{post.name}</li>
                                <li>{post.date}</li>
                            </Link>
                        </StyledListItem>
                    ))}
                </StyledList>
            </StyledBoard>
            <Pagination>
                <PageButton disabled>1</PageButton>
            </Pagination>
        </div >
    );
};

export default BoardList;
