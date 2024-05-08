import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import styled from 'styled-components';

const StyledDetail = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
`;

const StyledHeader = styled(Header)`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const DetailTitle = styled.div`
    border-bottom: 2px solid #070719;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const PostTitle = styled.h2`
    margin: 0;
    margin-bottom: 10px;
    text-align: center;
`;

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #070719;
    padding: 0 20px 15px 20px;
    margin-bottom: 20px;
`;

const PostContent = styled.p`
    margin: 0;
    padding-left: 20px;
`;

const BoardDetail = () => {
    const { id } = useParams();

    // 임의의 게시물 데이터
    const posts = [
        { id: 1, title: '첫 번째 글', name: '익명', date: '2024-04-18', content: '첫 번째 글 내용입니다.' },
        { id: 2, title: '두 번째 글', name: '익명', date: '2024-04-17', content: '두 번째 글 내용입니다.' },
        { id: 3, title: '세 번째 글', name: '익명', date: '2024-04-16', content: '세 번째 글 내용입니다.' },
    ];

    const post = posts.find(post => post.id === parseInt(id));

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="boardDetail-container">
            <StyledHeader />
            <StyledDetail className="boardDetail-contents">
                <DetailTitle>
                    <PostTitle>{post.title}</PostTitle>
                </DetailTitle>
                <PostInfo>
                    <div><b>작성자</b>&nbsp;&nbsp;{post.name}</div>
                    <div><b>작성일</b>&nbsp;&nbsp;{post.date}</div>
                </PostInfo>
                <PostContent>{post.content}</PostContent>
            </StyledDetail>
        </div>
    );
};

export default BoardDetail;
