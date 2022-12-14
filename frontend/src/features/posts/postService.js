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
  return response.data;
};

// Edit a post
const editPost = async (postData, token) => {
  console.log(postData.id);
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios.put(API_URL + postData.id, postData, config);
  return response.data;
};

// Delete a post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + postId, config);

  return response.data;
};

const postService = {
  createPost,
  getPosts,
  deletePost,
  editPost,
};

export default postService;
