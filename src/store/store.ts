import {configureStore} from '@reduxjs/toolkit'
import educationReducer from '@/store/educationSlice'	
import skillsReducer from '@/store/skillsSlice'
import feedbackReducer from '@/store/feedbackSlice'
import experienceReducer from '@/store/experienceSlice'
import portfolioReducer from '@/store/portfolioSlice'

export const store = configureStore({
  reducer: {
    education: educationReducer,
    skills: skillsReducer,
    feedback: feedbackReducer,
    experience: experienceReducer,
    portfolio: portfolioReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
