"use client"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from './Chart';
import { updateSpent } from '@/redux/slices/budgetSlice';

export default function Dashboard() {
  // Fetching transaction and budget states
  const { transactions } = useSelector((state) => state.transactions);
  const { budget, spent } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  // Calculating the total income
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

  // Calculating the total expense
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

  // Updating Spent
  useEffect(() => {
    dispatch(updateSpent(totalExpenses));
  }, [totalExpenses, dispatch]);

  // Determine feedback based on budget adherence
  const budgetStatus = spent > budget
    ? 'over'
    : spent / budget > 0.8
    ? 'close'
    : 'within';

  // Feedback message based on budget status
  const getFeedbackMessage = () => {
    switch (budgetStatus) {
      case 'over':
        return 'You have exceeded your budget! Consider reviewing your expenses.';
      case 'close':
        return 'You are close to your budget limit. Keep an eye on your spending.';
      default:
        return 'You are within your budget. Great job staying on track!';
    }
  };

  return (
    <div className="p-4 bg-black h-full">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div
          className="p-4 bg-gray-300 text-white rounded transition-shadow duration-300"
          style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(66, 153, 225, 0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)')}
        >
          <h2 className="text-lg text-black font-bold">Total Income</h2>
          <p className="text-xl text-black">${totalIncome.toFixed(2)}</p>
        </div>
        <div
          className="p-4 bg-gray-300 text-white rounded transition-shadow duration-300"
          style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(66, 153, 225, 0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)')}
        >
          <h2 className="text-lg text-black font-bold">Total Expenses</h2>
          <p className="text-xl text-black">${totalExpenses.toFixed(2)}</p>
        </div>
        <div
          className="p-4 bg-gray-300 text-white rounded transition-shadow duration-300"
          style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(66, 153, 225, 0.4)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)')}
        >
          <h2 className="text-lg text-black font-bold">Spend / Budget</h2>
          <p className="text-xl text-black">${spent.toFixed(2)}/${budget.toFixed(2)}</p>
        </div>
      </div>

      {/* Feedback section */}
      <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Budget Feedback</h2>
        <p>{getFeedbackMessage()}</p>
      </div>

      {/* Charts for visualizing income and expense details */}
      <div className="h-3/6 flex justify-center mt-6">
        <Chart transactions={transactions} />
      </div>
    </div>
  );
}
