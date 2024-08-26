"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Import ArcElement for pie chart
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2"; // Import Pie component

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const getGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

export default function Chart({ transactions }) {
  const chartData1 = useMemo(() => {
    const incomeCategories = transactions
      .filter((t) => t.type === "income")
      .map((t) => t.category);

    const incomeData = incomeCategories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === "income")
        .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00)
    );

    return {
      labels: [...new Set([...incomeCategories])],
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            return getGradient(ctx, 'rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.3)');
          },
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  }, [transactions]);

  const chartData2 = useMemo(() => {
    const expenseCategories = transactions
      .filter((t) => t.type === "expense")
      .map((t) => t.category);

    const expenseData = expenseCategories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === "expense")
        .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00)
    );

    return {
      labels: [...new Set([...expenseCategories])],
      datasets: [
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            return getGradient(ctx, 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.3)');
          },
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
  }, [transactions]);

  // Pie chart data for overall income vs. expenses
  const pieChartData = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => parseFloat(acc) + parseFloat(t.amount), 0.00);

    return {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [totalIncome, totalExpenses],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        },
      ],
    };
  }, [transactions]);

  const incomeTableData = useMemo(() => {
    const incomeCategories = chartData1.labels;
    const incomeData = chartData1.datasets[0].data;

    return incomeCategories.map((category, index) => ({
      category,
      amount: incomeData[index].toFixed(2),
    }));
  }, [chartData1]);

  const expenseTableData = useMemo(() => {
    const expenseCategories = chartData2.labels;
    const expenseData = chartData2.datasets[0].data;

    return expenseCategories.map((category, index) => ({
      category,
      amount: expenseData[index].toFixed(2),
    }));
  }, [chartData2]);

  return (
    <div className="block md:flex md:justify-between md:items-start mt-20 md:mt-0">
      <div className="mb-10 md:mb-0 md:mr-10 w-full md:w-1/2">
        <h4 className="text-white font-semibold mb-5 mt-2">Income</h4>
        <Bar data={chartData1} options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white',
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.label}: $${context.raw.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        }} />
        <table className="w-full mt-4 bg-gray-300 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600">
              <th className="p-2 text-black border-b">Category</th>
              <th className="p-2 text-black border-b">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {incomeTableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-500">
                <td className="p-2 text-black border-b">{row.category}</td>
                <td className="p-2 text-black border-b text-right">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-10 md:mb-0 md:mr-10 w-full md:w-1/2">
        <h4 className="text-white font-bold mb-5 mt-2">Expenses</h4>
        <Bar data={chartData2} options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white',
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.label}: $${context.raw.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        }} />
        <table className="w-full mt-4 bg-gray-300 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600">
              <th className="p-2 text-black border-b">Category</th>
              <th className="p-2 text-black border-b">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {expenseTableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-500">
                <td className="p-2 text-black border-b">{row.category}</td>
                <td className="p-2 text-black border-b text-right">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-1/2 mt-10">
        <h4 className="text-white font-semibold mb-5 mt-2">Income vs. Expenses</h4>
        <Pie data={pieChartData} options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white',
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.label}: $${context.raw.toFixed(2)}`;
                },
              },
            },
          },
        }} />
      </div>
    </div>
  );
}

