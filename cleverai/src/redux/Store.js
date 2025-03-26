import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reduxFeatures/auth/AuthSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})