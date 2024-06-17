import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

type Language = 'en' | 'ru'

interface PortfolioItem {
  id: number
  category: Record<Language, string>
  imageUrl: string
  info: {
    title: Record<Language, string>
    text: Record<Language, string>
    url: string
  }
}

export interface PortfolioState {
  data: PortfolioItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: PortfolioState = {
  data: [],
  status: 'idle',
}

export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async () => {
		await new Promise((resolve) => setTimeout(resolve, 2100)); 

    const response = await fetch('/api/portfolio')
    const data = await response.json()
    return data
  }
)

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchPortfolio.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default portfolioSlice.reducer
