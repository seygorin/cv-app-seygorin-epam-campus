import {configureStore} from '@reduxjs/toolkit'
import educationReducer, {
  fetchEducation,
  EducationState,
} from './educationSlice'
import fetchMock from 'jest-fetch-mock'

beforeEach(() => {
  fetchMock.resetMocks()
})

const createMockStore = (initialState: {education: EducationState}) =>
  configureStore({
    reducer: {
      education: educationReducer,
    },
    preloadedState: initialState,
  })

describe('educationSlice', () => {
  test('should return the initial state', () => {
    const initialState: EducationState = {
      data: [],
      status: 'idle',
    }
    const store = createMockStore({education: initialState})
    const state = store.getState().education
    expect(state).toEqual(initialState)
  })

  test('should handle fetchEducation pending', () => {
    const initialState: EducationState = {
      data: [],
      status: 'idle',
    }
    const store = createMockStore({education: initialState})

    store.dispatch(fetchEducation.pending('', undefined))
    const state = store.getState().education
    expect(state.status).toEqual('loading')
  })

  test('should handle fetchEducation fulfilled', async () => {
    const initialState: EducationState = {
      data: [],
      status: 'idle',
    }
    const store = createMockStore({education: initialState})

    const mockData = [
      {id: 1, name: 'Education 1'},
      {id: 2, name: 'Education 2'},
    ]
    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    await store.dispatch(fetchEducation())
    const state = store.getState().education
    expect(state.status).toEqual('succeeded')
    expect(state.data).toEqual(mockData)
  })

  test('should handle fetchEducation rejected', async () => {
    const initialState: EducationState = {
      data: [],
      status: 'idle',
    }
    const store = createMockStore({education: initialState})

    fetchMock.mockRejectOnce(new Error('Failed to fetch'))

    await store.dispatch(fetchEducation())
    const state = store.getState().education
    expect(state.status).toEqual('failed')
    expect(state.data).toEqual([])
  })
})
