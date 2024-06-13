import {configureStore} from '@reduxjs/toolkit'
import fetchMock from 'jest-fetch-mock'
import skillsReducer, {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  toggleForm,
  setEditSkill,
  closeForm,
  SkillsState,
  Skill,
} from './skillsSlice'

beforeEach(() => {
  fetchMock.resetMocks()
})

const createTestStore = () => {
  return configureStore({
    reducer: {
      skills: skillsReducer,
    },
  })
}

describe('skillsSlice', () => {
  test('should handle initial state', () => {
    const store = createTestStore()
    const state: SkillsState = store.getState().skills
    expect(state).toEqual({
      data: [],
      status: 'idle',
      isFormOpen: false,
      editSkill: null,
    })
  })

  test('should handle fetchSkills.pending', () => {
    const store = createTestStore()
    store.dispatch(fetchSkills.pending(''))
    const state: SkillsState = store.getState().skills
    expect(state.status).toBe('loading')
  })

  test('should handle fetchSkills.fulfilled', async () => {
    const mockData: Skill[] = [
      {id: '1', name: 'JavaScript', range: 90},
      {id: '2', name: 'React', range: 85},
    ]

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    const store = createTestStore()
    await store.dispatch(fetchSkills())

    const state: SkillsState = store.getState().skills
    expect(state.status).toBe('succeeded')
    expect(state.data).toEqual(mockData)
  })

  test('should handle fetchSkills.rejected', async () => {
    fetchMock.mockRejectOnce(new Error('API error'))

    const store = createTestStore()
    await store.dispatch(fetchSkills())

    const state: SkillsState = store.getState().skills
    expect(state.status).toBe('failed')
    expect(state.data).toEqual([])
  })

  test('should handle addSkill.fulfilled', async () => {
    const newSkill: Skill = {id: '3', name: 'TypeScript', range: 80}

    fetchMock.mockResponseOnce(JSON.stringify(newSkill))

    const store = createTestStore()
    await store.dispatch(addSkill(newSkill))

    const state: SkillsState = store.getState().skills
    expect(state.data).toContainEqual(newSkill)
  })

  test('should handle updateSkill.fulfilled', async () => {
    const initialState: Skill[] = [{id: '1', name: 'JavaScript', range: 90}]

    const updatedSkill: Skill = {id: '1', name: 'JavaScript', range: 95}

    fetchMock.mockResponseOnce(JSON.stringify(updatedSkill))

    const store = createTestStore()
    store.dispatch(fetchSkills.fulfilled(initialState, '', undefined))
    await store.dispatch(updateSkill.fulfilled(updatedSkill, '', updatedSkill))

    const state: SkillsState = store.getState().skills
    expect(state.data).toContainEqual(updatedSkill)
  })

  test('should handle deleteSkill.fulfilled', async () => {
    const initialState: Skill[] = [{id: '1', name: 'JavaScript', range: 90}]

    const skillId = '1'

    fetchMock.mockResponseOnce(JSON.stringify(skillId))

    const store = createTestStore()
    store.dispatch(fetchSkills.fulfilled(initialState, '', undefined))
    await store.dispatch(deleteSkill.fulfilled(skillId, '', skillId))

    const state: SkillsState = store.getState().skills
    expect(state.data).not.toContainEqual(
      expect.objectContaining({id: skillId})
    )
  })

  test('should handle toggleForm action', () => {
    const store = createTestStore()

    store.dispatch(toggleForm())
    let state: SkillsState = store.getState().skills
    expect(state.isFormOpen).toBe(true)

    store.dispatch(toggleForm())
    state = store.getState().skills
    expect(state.isFormOpen).toBe(false)
  })

  test('should handle setEditSkill action', () => {
    const store = createTestStore()
    const skill: Skill = {id: '1', name: 'JavaScript', range: 90}

    store.dispatch(setEditSkill(skill))

    const state: SkillsState = store.getState().skills
    expect(state.editSkill).toEqual(skill)
    expect(state.isFormOpen).toBe(true)
  })

  test('should handle closeForm action', () => {
    const store = createTestStore()
    store.dispatch(closeForm())

    const state: SkillsState = store.getState().skills
    expect(state.isFormOpen).toBe(false)
    expect(state.editSkill).toBe(null)
  })
})
