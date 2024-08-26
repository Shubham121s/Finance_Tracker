"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/slices/transactionsSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TransactionList() {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const router = useRouter();

  // Implementing prefetching on hover
  const handlePrefetch = (path) => {
    router.prefetch(path);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
        <h2 className="text-2xl font-bold text-gray-800">All Transactions</h2>
        <Link
          href="/transactions/add"
          className="flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium"
          prefetch={false}
          onMouseEnter={() => handlePrefetch("/transactions/add")}
        >
          <Image
            src="/plus.svg"
            alt="add"
            width={24}
            height={24}
            className="filter-invert"
          />
          <span className="ml-2">Add Money 🪙</span>
        </Link>
      </div>
      <ul className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-sm hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all"
            >
              <div className="flex-1 flex justify-between items-center">
                <span className="text-gray-700 text-lg font-medium">{t.category}</span>
                <span className={`text-${t.type === "income" ? "green" : "red"}-600 text-lg font-semibold`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex space-x-3">
                <Link href={`/transactions/edit/${t.id}`} prefetch={false} onMouseEnter={() => handlePrefetch(`/transactions/edit/${t.id}`)}>
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <button
                  onClick={() => dispatch(deleteTransaction(t.id))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Image
                    src="/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-xl text-gray-600 text-center py-4">
            No Transactions ❌
          </li>
        )}
      </ul>
    </div>
  );
}

