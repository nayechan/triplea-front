import { useState, useEffect } from 'react';
import axios from 'axios';

const useBoardData = () => {
    const [data, setData] = useState([]);

    useEffect (()=> {
        axios.get('http://52.62.34.185:8080/api/notice_boards')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    const addPost = (newPost) => {
        axios.post('http://52.62.34.185:8080/api/notice_boards', newPost)
        .then(response => {
            setData(prevData => [...prevData, response.data]);
        })
        .catch(error => {
            console.error('Error saving post:', error);
        });
    };

    return { data, addPost };
}

export default useBoardData;
