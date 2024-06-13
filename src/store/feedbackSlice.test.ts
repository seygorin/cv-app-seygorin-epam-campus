import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import feedbackReducer, { fetchFeedback, FeedbackState } from './feedbackSlice';

beforeEach(() => {
  fetchMock.resetMocks();
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      feedback: feedbackReducer,
    },
  });
};

describe('feedbackSlice', () => {
  test('should handle initial state', () => {
    const store = createTestStore();
    const state: FeedbackState = store.getState().feedback;
    expect(state).toEqual({
      data: [],
      status: 'idle',
    });
  });

  test('should handle fetchFeedback.pending', () => {
    const store = createTestStore();
    store.dispatch(fetchFeedback.pending(''));
    const state: FeedbackState = store.getState().feedback;
    expect(state.status).toBe('loading');
  });

  test('should handle fetchFeedback.fulfilled', async () => {
    const mockData = [
      {
        feedback: 'Great service!',
        reporter: {
          photoUrl: '/images/reporter1.jpg',
          name: 'John Doe',
          citeUrl: 'https://example.com/john',
        },
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const store = createTestStore();
    await store.dispatch(fetchFeedback());

    const state: FeedbackState = store.getState().feedback;
    expect(state.status).toBe('succeeded');
    expect(state.data).toEqual(mockData);
  });

  test('should handle fetchFeedback.rejected', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));

    const store = createTestStore();
    await store.dispatch(fetchFeedback());

    const state: FeedbackState = store.getState().feedback;
    expect(state.status).toBe('failed');
    expect(state.data).toEqual([]);
  });
});
