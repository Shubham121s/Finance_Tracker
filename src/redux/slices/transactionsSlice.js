import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    editTransaction: (state, action) => {
      const { id, updatedTransaction } = action.payload;
      const index = state.transactions.findIndex(e => e.id == id);
      if (index !== -1) {
        state.transactions[index] = updatedTransaction;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
