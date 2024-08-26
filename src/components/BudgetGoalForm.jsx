"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBudget } from "../redux/slices/budgetSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function BudgetGoalForm() {
  const [budgetValue, setBudgetValue] = useState(0);
  const dispatch = useDispatch();

  // Setting the budget and storing it in the redux state
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(budgetValue);
    
    // Validation: Check if the amount is valid
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }

    dispatch(setBudget(amount));
    setBudgetValue(0);
    toast.success("Budget has been set successfully!");
  };

  return (
    <div className="w-full max-w-sm p-6 border rounded-xl shadow-lg sm:p-8 md:p-10 bg-gradient-to-r from-gray-600 to-gray-900">
      <form className="space-y-6 text-center" onSubmit={handleSubmit}>
        <h5 className="text-2xl font-bold text-white mb-4">Set Your Monthly Budget</h5>
        <div className="text-left">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Enter Amount:
          </label>
          <input
            onChange={(e) => setBudgetValue(e.target.value)}
            value={budgetValue}
            type="number"
            name="amount"
            id="amount"
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-500 text-white transition duration-300 transform hover:scale-105 focus:scale-105"
            placeholder="🪙 Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 transform hover:scale-105 focus:scale-105"
        >
          Set Budget
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
