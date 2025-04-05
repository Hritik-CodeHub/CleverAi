import { createSlice } from '@reduxjs/toolkit'
export const ClassInfoSlice = createSlice({
  name: 'classInfo',   //reduer name
  initialState: {    // Initialization
    selectedClassId: null,
  },
  reducers: {
    setClassId: (state, action) => {
      state.selectedClassId = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setClassId } = ClassInfoSlice.actions

export default ClassInfoSlice.reducer