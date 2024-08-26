import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budget: 0,
  spent: 0,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    updateSpent: (state, action) => {
      state.spent = action.payload;
    },
  },
});

export const { setBudget, updateSpent } = budgetSlice.actions;
export default budgetSlice.reducer;
