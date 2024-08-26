import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exchangeRateApi = createApi({
  reducerPath: 'exchangeRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v6.exchangerate-api.com/v6/' }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: (apiKey) => `${apiKey}/latest/USD`, 
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRateApi;

