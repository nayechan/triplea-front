import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';
import useBoardData from 'hooks/api/FetchBoardData';

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
    const { data: posts, getPost } = useBoardData();

    useEffect(() => {
        getPost();
    }, []);

    // 게시글 번호 내림차순 정렬
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    // 현재 페이지의 게시글 목록
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Array.isArray(sortedPosts) ? sortedPosts.slice(indexOfFirstPost, indexOfLastPost) : [];

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
                        <li>번호</li>
                        <li>내용</li>
                        <li>작성자</li>
                        <li>작성일</li>
                    </StyledListItemHeader>
                    {currentPosts.map((post, index) => (
                        <StyledListItem key={post.id}>
                            <Link to={`/post/${post.id}`}>
                                <li>{posts.length - (indexOfFirstPost + index)}</li>
                                <li>{post.title}</li>
                                <li>익명</li>
                                <li>{post.date}</li>
                            </Link>
                        </StyledListItem>
                    ))}
                </StyledList>
            </StyledBoard>
            <Pagination>
                {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, i) => (
                    <PageButton key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </PageButton>
                ))}
            </Pagination>
        </div>
    );
};

export default BoardList;
