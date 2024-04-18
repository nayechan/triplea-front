import React from 'react';
import { Link } from 'react-router-dom';
const BoardList = () => {
    // 임의의 게시물 데이터
    const posts = [
        { id: 1, title: '첫 번째 글', date: '2024-04-18', content: '첫 번째 글 내용입니다.' },
        { id: 2, title: '두 번째 글', date: '2024-04-17', content: '두 번째 글 내용입니다.' },
        { id: 3, title: '세 번째 글', date: '2024-04-16', content: '세 번째 글 내용입니다.' },
    ];

    return (
        <div>
            <h2>게시판 리스트</h2>
            <ul style={styles.postList}>
                {posts.map(post => (
                    <li key={post.id} style={styles.postItem}>
                        <Link to={`/post/${post.id}`} style={styles.postLink}>
                            <span style={styles.postId}>{post.id}</span>
                            <div style={styles.postContent}>
                                <span style={styles.postTitle}>{post.title}</span>
                                <span style={styles.postDate}>{post.date}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    boardContainer: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    postList: {
        listStyle: 'none',
        padding: 0,
    },
    postItem: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px',
    },
    postId: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    postContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    postTitle: {
        fontSize: '18px',
    },
    postDate: {
        color: '#666',
    },
};

export default BoardList;
