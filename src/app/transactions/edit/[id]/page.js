"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTransaction } from "@/redux/slices/transactionsSlice";

export default function TransactionForm() {
  const { id } = useParams();
  const router = useRouter();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { transactions } = useSelector((state) => state.transactions);
  const toUpdate = transactions.find((t) => t.id == id); // Use find for better readability
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (toUpdate) {
      setType(toUpdate.type);
      setCategory(toUpdate.category);
      setAmount(toUpdate.amount);
    }
  }, [toUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTransaction({
        id,
        updatedTransaction: {
          id,
          type,
          category,
          amount: parseFloat(amount).toFixed(2),
        },
      })
    );
    router.replace("/transactions");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-white">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl font-semibold text-gray-800 text-center">
            Update Transaction
          </h5>
          <div className="text-left">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Transaction Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="text-left">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="text-left">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter Amount
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              name="amount"
              id="amount"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-gray-300 placeholder-gray-500 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="$100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
