import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: Array(10).fill({ text: "", answere: "" }), // Initial state
};

const questionPaperSlice = createSlice({
  name: "questionPaper",
  initialState,
  reducers: {
    updateQuestion(state, action) {
      const { index, value } = action.payload;
      state.questions[index].text = value;
    },
    updateAnswer(state, action) {
      const { index, value } = action.payload;
      state.questions[index].answere = value;
    },
    resetQuestions(state) {
      state.questions = Array(10).fill({ text: "", answere: "" });
    },
  },
});

export const { updateQuestion, updateAnswer, resetQuestions } =
  questionPaperSlice.actions;
export default questionPaperSlice.reducer;
