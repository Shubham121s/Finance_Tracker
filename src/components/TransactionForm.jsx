"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
import { useGetExchangeRatesQuery } from "@/redux/slices/exchangeRateApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

export default function TransactionForm() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { transactions } = useSelector((state) => state.transactions);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState([]);

  // Fetching the data from Exchange Rate API
  const { data, error, isLoading } = useGetExchangeRatesQuery(
    process.env.NEXT_PUBLIC_API_KEY
  );

  // Memoizing to prevent unnecessary calculations
  const currencyType = useMemo(() => {
    if (data) {
      setExchangeRates(data.conversion_rates);
      return Object.keys(data.conversion_rates);
    }
    return ["INR", "USD", "JPY", "RUB", "CNY"];
  }, [data]);

  // Converting the input from user's currency to USD
  const handleCurrency = () => {
    setAmount2(amount / exchangeRates[currency]);
  };

  useEffect(() => {
    handleCurrency();
  }, [amount, currency]);

  // Adding the transaction to redux state and showing toast
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTransaction({
        id: Date.now(),
        type,
        category,
        amount: parseFloat(amount2).toFixed(2),
      })
    );

    // Show toast notification
    toast.success(`Transaction of ${amount2.toFixed(2)} USD added successfully!`);

    setAmount(0);
  };

  return (
    <div className="w-full max-w-sm p-6 border rounded-xl shadow-xl bg-gradient-to-br from-gray-200 to-gray-400">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-2xl font-semibold text-center text-gray-900">New Transaction</h5>
        
        <div className="text-left">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Transaction Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 hover:shadow-md"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div className="text-left">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 hover:shadow-md"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between space-x-4">
          <div className="text-left w-1/3">
            <label
              htmlFor="currencyType"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              id="currencyType"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 hover:shadow-md"
            >
              {currencyType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-left w-1/2">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Amount (Your Currency)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              name="amount"
              id="amount"
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-50 border-gray-300 transition-shadow duration-200 hover:shadow-md"
              placeholder="100"
              required
            />
          </div>
        </div>

        <div className="text-left">
          <label
            htmlFor="amount2"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Amount (in USD)
          </label>
          <input
            readOnly
            value={amount2.toFixed(2)}
            type="number"
            name="amount2"
            id="amount2"
            className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-50 border-gray-300 transition-shadow duration-200 hover:shadow-md"
            placeholder="$"
            required
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 focus:ring-green-800 transition-transform duration-200 transform hover:scale-105"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
