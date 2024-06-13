import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export interface EducationState {
  data: any[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: EducationState = {
  data: [],
  status: 'idle',
}

export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2600))

    const response = await fetch('/api/education')
    const data = await response.json()
    return data
  }
)

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchEducation.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default educationSlice.reducer
