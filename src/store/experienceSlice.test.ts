import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import experienceReducer, { fetchExperience, ExperienceState } from './experienceSlice';


beforeEach(() => {
  fetchMock.resetMocks();
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      experience: experienceReducer,
    },
  });
};

describe('experienceSlice', () => {
  test('should handle initial state', () => {
    const store = createTestStore();
    const state: ExperienceState = store.getState().experience;
    expect(state).toEqual({
      data: [],
      status: 'idle',
    });
  });

  test('should handle fetchExperience.pending', () => {
    const store = createTestStore();
    store.dispatch(fetchExperience.pending(''));
    const state: ExperienceState = store.getState().experience;
    expect(state.status).toBe('loading');
  });

  test('should handle fetchExperience.fulfilled', async () => {
    const mockData = [
      {
        date: '2022-01-01',
        info: {
          company: 'Company A',
          job: 'Developer',
          description: 'Developed applications',
        },
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const store = createTestStore();
    await store.dispatch(fetchExperience());

    const state: ExperienceState = store.getState().experience;
    expect(state.status).toBe('succeeded');
    expect(state.data).toEqual(mockData);
  });

  test('should handle fetchExperience.rejected', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));

    const store = createTestStore();
    await store.dispatch(fetchExperience());

    const state: ExperienceState = store.getState().experience;
    expect(state.status).toBe('failed');
    expect(state.data).toEqual([]);
  });
});
