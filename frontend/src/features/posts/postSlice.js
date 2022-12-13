import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Create a new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      // get auth token from thunkAPI getState method
      const token = thunkAPI.getState().auth.user.token;

      return postService.createPost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
