import { configureStore } from '@reduxjs/toolkit';
import classInfoReducer from '../reduxFeatures/info/ClassInfoSlice';
import questionPaperReducer from '../reduxFeatures/info/questionPaperSlice';

export const store = configureStore({
  reducer: {
    classInfo: classInfoReducer,
    questionPaper: questionPaperReducer,
  },
})
