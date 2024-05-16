import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useRouteTextContext, routeChannel } from 'contexts/RouteTextContext';

const StyledContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const PostTop = styled.h2`
    margin-top: 50px;
    text-align: center;
`;

const StyledHeader = styled(Header)`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const PostContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 20px 0;
`;

const AuthorContainer = styled.div`
    display: flex;
    align-items: center;

    input:focus {
        outline: none;
    }
`;

const PostTitle = styled.div`
    font-weight: bold;
`;

const PostAuthor = styled.div`
    font-weight: bold;
    padding: 5px;
    margin-right: 15px;
`;

const PostInput = styled.input`
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
`;

const ContentContainer = styled.div`
    height: 400px;
    max-height: 400px;
    margin: 10px 0;
    overflow-y: auto;
    padding: 10px;

    .ck.ck-content{
        height: 350px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;
`;

const StyledButton = styled.button`
    padding: 10px;
    margin-bottom: 0px;
    background-color: #088A68;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const PostTextArea = styled.textarea`
    width: 90%;
    height: 200px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    resize: vertical;
`;

const BoardPost = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    const { routeText: routeContent } = useRouteTextContext(); // Get route text from context

    useEffect(() => {
        console.log('routeContent:', routeContent);
    }, [routeContent]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSavePost = () => {
        if (password === '') {
            alert('비밀번호를 입력해주세요.');
        } else if (title === '') {
            alert('제목을 입력해주세요.')
        } else if (content === '') {
            alert('내용을 입력해주세요')
        } else {
            const currentDate = new Date().toISOString().slice(0, 10);
            const newPost = {
                title: title,
                contents: content,
                password: password,
                date: currentDate,
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
                    <PostTop>게시글 작성</PostTop>
                    <PostContainer>
                        <PostTitle>제목</PostTitle>
                        <PostInput
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </PostContainer>
                    <AuthorContainer>
                        <PostAuthor>작성자</PostAuthor>
                        <input
                            type="checkbox"
                            checked
                            readOnly
                            style={{ width: '20px' }}
                        />
                        <div>익명</div>
                    </AuthorContainer>
                    <hr />
                    <PostContainer style={{ display: routeContent ? 'flex' : 'none' }}>
                        <PostTitle>여행 일정</PostTitle>
                        <PostTextArea
                            value={routeContent} // Display route text here
                            readOnly
                        />
                    </PostContainer>
                    <ContentContainer>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleContentChange}
                        />
                    </ContentContainer>
                    <PostContainer>
                        <PostTitle>비밀번호</PostTitle>
                        <PostInput
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </PostContainer>
                </div>
                <ButtonContainer>
                    <Link to="/board">
                        <StyledButton>목록</StyledButton>
                    </Link>
                    <StyledButton onClick={handleSavePost}>저장</StyledButton>
                </ButtonContainer>
            </StyledContainer>
        </div>
    );
};

export default BoardPost;
