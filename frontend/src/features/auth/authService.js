import axios from 'axios';

const API_URL = '/api/users/';

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  // Check for response data, set localStorage 'user' to response data
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Log In
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  // Check for response data, set localStorage 'user' to response data
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
};
export default authService;
