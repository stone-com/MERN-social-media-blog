import axios from 'axios';

const API_URL = '/api/users/';

// get user profile
export const getProfile = async (id, token) => {
  const config = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};


