import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'

export interface Skill {
  id: string
  name: string
  range: number
}

export interface SkillsState {
  data: Skill[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'

  isFormOpen: boolean
  editSkill: Skill | null
}

const initialState: SkillsState = {
  data: [],
  status: 'idle',

  isFormOpen: false,
  editSkill: null,
}

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
	await new Promise((resolve) => setTimeout(resolve, 1500)); 
	const response = await fetch('/api/skills')
  if (!response.ok) throw new Error('Failed to fetch skills')
  return response.json()
})

export const addSkill = createAsyncThunk(
  'skills/addSkill',
  async (newSkill: Skill) => {
    const response = await fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSkill),
    })
    if (!response.ok) throw new Error('Failed to add skill')
    return response.json()
  }
)

export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async (updatedSkill: Skill) => {
    const response = await fetch(`/api/skills?id=${updatedSkill.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSkill),
    })
    if (!response.ok) throw new Error('Failed to update skill')
    return response.json()
  }
)

export const deleteSkill = createAsyncThunk(
  'skills/deleteSkill',
  async (skillId: string) => {
    const response = await fetch(`/api/skills?id=${skillId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete skill')
    return skillId
  }
)

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    toggleForm(state) {
      state.isFormOpen = !state.isFormOpen
      if (!state.isFormOpen) {
        state.editSkill = null
      }
    },
    setEditSkill(state, action) {
      state.editSkill = action.payload
      state.isFormOpen = true
    },
    closeForm(state) {
      state.isFormOpen = false
      state.editSkill = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(addSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.data.push(action.payload)
      })
      .addCase(updateSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        const index = state.data.findIndex(
          (skill) => skill.id === action.payload.id
        )
        if (index !== -1) state.data[index] = action.payload
      })
      .addCase(
        deleteSkill.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((skill) => skill.id !== action.payload)
        }
      )
  },
})

export const {toggleForm, setEditSkill, closeForm} = skillsSlice.actions

export default skillsSlice.reducer
