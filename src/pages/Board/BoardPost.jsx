import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouteTextContext } from 'contexts/RouteTextContext';
import useBoardData from 'hooks/api/FetchBoardData';

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

    .ck.ck-content {
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

const BoardPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { routeText, setRouteText } = useRouteTextContext();
    const { addPost, updatePost } = useBoardData();
    const location = useLocation();

    useEffect(() => {
        console.log('routeContent:', routeText);
    }, [routeText]);

    useEffect(() => {
        if (location.state && location.state.post) {
            setTitle(location.state.post.title);
            setContent(location.state.post.contents);
        }
    }, [location.state]);

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

    const handleSavePost = async () => {
        // 입력 검증
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content && !routeText) {
            alert('내용을 입력해주세요.');
            return;
        }

        const formattedRouteText = routeText.split('\n').map(line => `<div><b/>${line}</div>`).join('');
        // 본문과 여행 일정을 결합
        const fullContent = `${formattedRouteText}\n\n${content}\n`;
        const currentDate = new Date().toISOString().slice(0, 10);
        const newPost = {
            title: title,
            contents: fullContent,
            password: password,
            date: currentDate,
        }

        // 게시글 수정 또는 새 게시글 저장
        if (location.state && location.state.post) {
            // 게시글 수정
            try {
                await updatePost(location.state.post.id, newPost);
            } catch (error) {
                console.error('Error updating post:', error);
            }
        } else {
            // 새 게시글 저장

            try {
                await addPost(newPost); // addPost는 이미 성공 및 오류 처리를 포함하고 있음
            } catch (error) {
                console.error('Error saving post:', error);
            }
        }
        setTitle('');
        setContent('');
        setPassword('');
        setRouteText('');
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 키 동작 방지 (폼 제출 등)
            handleSavePost();
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
                            onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
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
                    <PostContainer style={{ display: routeText ? 'flex' : 'none' }}>
                        <PostTitle>여행 일정</PostTitle>
                        <PostTextArea
                            value={routeText} // Display route text here
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
                            onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
                        />
                    </PostContainer>
                </div>
                <ButtonContainer>
                    <Link to="/boardList">
                        <StyledButton>목록</StyledButton>
                    </Link>
                    <StyledButton onClick={handleSavePost}>저장</StyledButton>
                </ButtonContainer>
            </StyledContainer>
        </div>
    );
};

export default BoardPost;
