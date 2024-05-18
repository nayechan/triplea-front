import { useState } from 'react';
import axios from 'axios';

const useBoardData = () => {
    const [data, setData] = useState([]);

    const getPost = () => {
        axios.get('http://localhost:8080/api/notice_boards')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    const addPost = (newPost) => {
        console.log('addPost : ', newPost);
        axios.post('http://localhost:8080/api/notice_boards', newPost)
            .then(response => {
                setData(prevData => [...prevData, response.data]);
                console.log('success post : ', response);
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

    const updatePost = (id, updatedPost) => {
        return axios.put(`http://localhost:8080/api/notice_boards/${id}`, updatedPost)
            .then(response => {
                setData(prevData => prevData.map(post => post.id === id ? response.data : post));
                console.log('success update : ', response);
            })
            .catch(error => {
                console.error('Error updating post:', error);
                throw error;
            });
    };

    const deletePost = (id, password) => {
        return axios.delete(`http://localhost:8080/api/notice_boards/${id}`, { data: { id: id, password : password } })
            .then(response => {
                //setData(prevData => prevData.filter(post => post.id !== id));
                console.log('success delete : ', response);
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                throw error;
            });
    };

    return { data, getPost, addPost, updatePost, deletePost };
};

export default useBoardData;
