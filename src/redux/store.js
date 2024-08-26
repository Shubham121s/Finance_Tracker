import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import categoriesReducer from './slices/categoriesSlice';
import budgetReducer from './slices/budgetSlice';
import { exchangeRateApi } from './slices/exchangeRateApi';

export const store = configureStore({
    reducer: {
      transactions: transactionsReducer,
      categories: categoriesReducer,
      budget: budgetReducer,
      [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(exchangeRateApi.middleware),
  });
  