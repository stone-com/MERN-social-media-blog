import axios from 'axios';

const API_URL = '/api/posts/';

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

const postService = {
  createPost,
};

export default postService;
