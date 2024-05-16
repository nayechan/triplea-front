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
                console.log('success post : ', response)
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

    return { data, getPost, addPost };
}

export default useBoardData;
