import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  allPosts: [],
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

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getall',
  async (_, thunkAPI) => {
    try {
      // get auth token from thunkAPI getState method
      const token = thunkAPI.getState().auth.user.token;

      return postService.getPosts(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit a post
export const editPost = createAsyncThunk(
  'posts/edit',
  async (postData, thunkAPI) => {
    try {
      // get auth token from thunkAPI getState method
      const token = thunkAPI.getState().auth.user.token;

      return postService.editPost(postData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// we pass in the 
export const likeOrDislike = createAsyncThunk(
  'posts/like',
  async (data, thunkAPI) => {
    try {
      // get auth token from thunkAPI getState method
      const token = thunkAPI.getState().auth.user.token;

      return postService.likeOrDislikePost(data, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      // Get auth token from thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      return postService.deletePost(id, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allPosts.unshift({
          ...action.payload,
          author: action.payload.user.name,
          authorId: action.payload.user._id,
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message(action.payload);
      })
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allPosts = action.payload.reverse();
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Edit a post
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allPosts = state.allPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Edit a post
      .addCase(likeOrDislike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeOrDislike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allPosts = state.allPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likeOrDislike.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete a post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allPosts = state.allPosts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
