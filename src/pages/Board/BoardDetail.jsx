import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    padding: 0 20px 40px 20px;
    border-bottom: 1px solid #070719;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ButtonContent = styled.button`
    padding: 10px 20px;
    background-color: #088A68;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
`;

const BoardDetail = ({ posts }) => {
    const { id } = useParams();
    const post = posts.find(post => post.id === parseInt(id));

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }
    const handleEdit = () => {
        let enteredPassword = '';
        let confirmed = false;

        while (!confirmed) {
            enteredPassword = prompt('비밀번호를 입력하세요:');
            if (enteredPassword === null) return; // 사용자가 취소를 누른 경우
            if (enteredPassword === post.password) {
                
            } else {
                alert('비밀번호가 틀렸습니다. 다시 입력하세요.');
            }
        }
    };

    const handleDelete = () => {
        let enteredPassword = '';
        let confirmed = false;

        while (!confirmed) {
            enteredPassword = prompt('비밀번호를 입력하세요:');
            if (enteredPassword === null) return; // 사용자가 취소를 누른 경우
            if (enteredPassword === post.password) {
                confirmed = window.confirm('정말로 글을 삭제하시겠습니까?');
                if (confirmed) {
                    console.log('글 삭제');
                }
            } else {
                alert('비밀번호가 틀렸습니다. 다시 입력하세요.');
            }
        }
    };

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
                <ButtonContainer>
                    <Link to="/boardList">
                        <ButtonContent>목록 보기</ButtonContent>
                    </Link>
                    <ButtonContent onClick={handleEdit} style={{marginLeft: '500px'}}>글 수정</ButtonContent>
                    <ButtonContent onClick={handleDelete}>글 삭제</ButtonContent>
                </ButtonContainer>
            </StyledDetail>
        </div>
    );
};

export default BoardDetail;
