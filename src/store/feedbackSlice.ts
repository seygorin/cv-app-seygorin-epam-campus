import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface FeedbackState {
  data: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FeedbackState = {
  data: [],
  status: 'idle',
};

export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async () => {
  await new Promise((resolve) => setTimeout(resolve, 3500)); 
  const response = await fetch('/api/feedback');
  const data = await response.json();
  return data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default feedbackSlice.reducer;
