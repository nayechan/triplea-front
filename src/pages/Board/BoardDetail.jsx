import React from 'react';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
    const { id } = useParams();
    // 임의의 게시물 데이터를 가져오는 비동기 처리가 여기에 들어갈 수 있습니다.

    // 임의의 게시물 데이터
    const posts = [
        { id: 1, title: '첫 번째 글', date: '2024-04-18', content: '첫 번째 글 내용입니다.' },
        { id: 2, title: '두 번째 글', date: '2024-04-17', content: '두 번째 글 내용입니다.' },
        { id: 3, title: '세 번째 글', date: '2024-04-16', content: '세 번째 글 내용입니다.' },
    ];

    const post = posts.find(post => post.id === parseInt(id));

    if (!post) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div style={styles.postContainer}>
            <h2>{post.title}</h2>
            <p>게시일: {post.date}</p>
            <p>{post.content}</p>
        </div>
    );
};

const styles = {
    postContainer: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
};

export default BoardDetail;
