import axios from 'axios';

const API_URL = '/api/posts/';

// Create a post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

// Get all posts
const getPosts = async (token) => {
  const config = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

const postService = {
  createPost,
  getPosts,
};

export default postService;
