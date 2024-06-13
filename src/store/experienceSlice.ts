import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

 interface ExperienceInfo {
  company: string
  job: string
  description: string
}

interface ExperienceItem {
  date: string
  info: ExperienceInfo
}

export interface ExperienceState {
  data: ExperienceItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ExperienceState = {
  data: [],
  status: 'idle',
}

export const fetchExperience = createAsyncThunk(
  'experience/fetchExperience',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await fetch('/api/experience')
    const data = await response.json()
    return data
  }
)

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchExperience.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default experienceSlice.reducer
