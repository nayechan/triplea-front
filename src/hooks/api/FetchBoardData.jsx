import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useBoardData = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getPost = () => {
        axios.get('http://localhost:8080/api/notice_boards')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    // const addPost = (newPost) => {
    //     console.log('addPost : ', newPost);
    //     axios.post('http://localhost:8080/api/notice_boards', newPost)
    //         .then(response => {
    //             setData(prevData => [...prevData, response.data]);
    //             console.log('success post : ', response);
    //         })
    //         .catch(error => {
    //             console.error('Error adding post:', error);
    //         });
    // };

    const addPost = (newPost) => {
        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/notice_boards',
            data: newPost,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        axios(config)
            .then(response => {
                setData(prevData => [...prevData, response.data]);
                console.log('success post : ', response);
                alert('게시글이 성공적으로 저장되었습니다.');
                navigate(`/boardList`); // 새 게시글로 이동
            })
            .catch(error => {
                console.error('Error adding post:', error);
                alert('게시글 저장 중 오류가 발생했습니다.');
            });
    };

    const updatePost = async (id, updatedPost) => {
        const config = {
            method: 'put',
            url: `http://localhost:8080/api/notice_boards/${id}`,
            data: updatedPost,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const response = await axios(config);
            setData(prevData => 
                prevData.map(post => 
                    post.id === id ? response.data : post
                )
            );
            console.log('success update : ', response);
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/post/${id}`); // 수정된 게시글로 이동
        } catch (error) {
            console.error('Error updating post:', error);
            alert('게시글 수정 중 오류가 발생했습니다.');
        }
    };

    const deletePost = (id, password) => {
        const url = `http://localhost:8080/api/notice_boards/${id}?password=${encodeURIComponent(password)}`;
    
        axios.delete(url)
            .then(response => {
                setData(prevData => prevData.filter(post => post.id !== id));
                console.log('Success delete:', response);
                alert('게시글이 성공적으로 삭제되었습니다.');
                navigate('/boardList');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                }
                alert('게시글 삭제 중 오류가 발생했습니다. 비밀번호를 확인하거나 다시 시도해 주세요.');
            });
    };
    
    return { data, getPost, addPost, updatePost, deletePost };
};

export default useBoardData;
