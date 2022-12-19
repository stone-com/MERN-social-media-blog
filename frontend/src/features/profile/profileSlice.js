import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from './profileService';

const initialState = {
  currentProfile: {},
  isLoading: false,
  isError: false,
  message: '',
};

// Get user profile
export const getUserProfile = createAsyncThunk(
  'profile/getprofile',
  async (id, thunkAPI) => {
    try {
      // get auth token from thunkAPI getState method
      const token = thunkAPI.getState().auth.user.token;
      return getProfile(id, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // addPostToUserProfile: state => state.currentProfile.posts.unshift()
  },
  extraReducers: (builder) => {
    builder
      // Get all posts
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
