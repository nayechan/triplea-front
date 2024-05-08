import React, { useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';

const StyledContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const StyledHeader = styled(Header)`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BoardPost = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSavePost = () => {
        if (password === '') {
            alert('비밀번호를 입력해주세요.');
        } else {
            const newPost = {
                title: title,
                content: content,
                password: password,
            };
            onAddPost(newPost);
            // 게시글 저장 후 폼 초기화
            setTitle('');
            setContent('');
            setPassword('');
        }
    };

    return (
        <div className="boardPost-container">
            <StyledHeader />
            <StyledContainer>
                <div>
                    <h2>게시글 작성</h2>
                    <StyledInput
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <StyledTextarea
                        placeholder="내용"
                        value={content}
                        onChange={handleContentChange}
                    />
                    <StyledInput
                        type="password"
                        placeholder="비밀번호 설정"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <StyledButton onClick={handleSavePost}>저장</StyledButton>
                </div>
            </StyledContainer>
        </div>
    );
};

export default BoardPost;
