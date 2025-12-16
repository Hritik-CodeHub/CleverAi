import { configureStore } from '@reduxjs/toolkit';
import classInfoReducer from './slices/ClassInfoSlice';
import questionPaperReducer from './slices/questionPaperSlice';

export const store = configureStore({
  reducer: {
    classInfo: classInfoReducer,
    questionPaper: questionPaperReducer,
  },
})
