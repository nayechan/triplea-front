import React, { useState } from 'react';

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
        <div style={styles.container}>
            <h2>게시글 작성</h2>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={handleTitleChange}
                style={styles.input}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={handleContentChange}
                style={styles.textarea}
            />
            <input
                type="password"
                placeholder="비밀번호 설정"
                value={password}
                onChange={handlePasswordChange}
                style={styles.input}
            />
            <button onClick={handleSavePost} style={styles.button}>저장</button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: '200px',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default BoardPost;
