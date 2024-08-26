"use client";

import React, { useState } from "react";
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
    <div className="w-full max-w-md p-4 border rounded-lg shadow-md sm:p-6 md:p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
        <Link
          href="/transactions/add"
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          prefetch={false}
          onMouseEnter={() => handlePrefetch("/transactions/add")}
        >
          <Image
            src="/plus.svg"
            alt="add"
            width={20}
            height={20}
            style={{
              filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
            }}
          />
          <span className="ml-1">Add Money 🪙</span>
        </Link>
      </div>
      <ul className="space-y-2">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li key={t.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all">
              <div className="flex-1 flex justify-between">
                <span className="text-gray-700">{t.category}</span>
                <span className={`text-${t.type === "income" ? "green" : "red"}-600`}>
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link href={`/transactions/edit/${t.id}`} prefetch={false} onMouseEnter={() => handlePrefetch(`/transactions/edit/${t.id}`)}>
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                    className="cursor-pointer hover:opacity-80 transition-all"
                    style={{
                      filter: "invert(53%) sepia(95%) saturate(918%) hue-rotate(77deg) brightness(107%) contrast(136%)",
                    }}
                  />
                </Link>
                <button
                  onClick={() => dispatch(deleteTransaction(t.id))}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <Image
                    src="/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    className="cursor-pointer hover:opacity-80 transition-all"
                    style={{
                      filter: "invert(15%) sepia(59%) saturate(6995%) hue-rotate(357deg) brightness(96%) contrast(114%)",
                    }}
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
