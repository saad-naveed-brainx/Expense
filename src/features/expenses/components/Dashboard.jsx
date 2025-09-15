import React from "react";
import { Pie } from "react-chartjs-2";
import { useLoaderData } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CHART_COLORS, CHART_LABELS } from "../../../utils/constants";
import { formatAmount, getCategoryBadgeClasses } from "../../../utils/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const loaderData = useLoaderData();

    const { calculation, graphData, last3DaysExpenses } = loaderData || {};
    const { totalBalance, totalExpense, totalIncome } = calculation || {};
    const recentExpenses = Array.isArray(last3DaysExpenses) ? last3DaysExpenses : [];

    const data = {
        labels: CHART_LABELS,
        datasets: [
            {
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                },
                data: [totalExpense || 0, totalIncome || 0],
                backgroundColor: [CHART_COLORS.EXPENSE, CHART_COLORS.INCOME],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="h-full w-full bg-white dark:bg-black rounded-xl px-12 pt-16 pb-8 overflow-y-auto">
            <div className="h-full w-full flex flex-col gap-8">
                <div className="w-full flex gap-4 items-center justify-between">
                    <div className="w-full rounded-2xl border border-gray-800">
                        <div className="px-6 py-4 border-b border-gray-800">
                            <h2 className="text-2xl font-semibold text-black dark:text-white ">
                                Your Account Information
                            </h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white text-black">
                                    Total Balance
                                </h3>
                                <p className="text-lg font-semibold dark:text-white text-black">
                                    {formatAmount(totalBalance || 0)}
                                </p>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white text-black">
                                    Total Expenses
                                </h3>
                                <p className="text-lg font-semibold dark:text-white text-black">
                                    {formatAmount(totalExpense || 0)}
                                </p>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold dark:text-white text-black">Total Income</h3>
                                <p className="text-lg font-semibold dark:text-white text-black">
                                    {formatAmount(totalIncome || 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="rounded-2xl border border-gray-800">
                            <div className="border-b px-6 py-4 border-gray-800">
                                <h2 className="text-2xl font-semibold text-black dark:text-white">
                                    Expense vs Income
                                </h2>
                            </div>
                            <div className="w-full py-4">
                                <Pie data={data} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full rounded-2xl border border-gray-800">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h2 className="text-2xl font-semibold text-black dark:text-white">
                            Recent Expenses in past 3 days
                        </h2>
                    </div>
                    <div className="w-full">
                        <div className="relative">
                            <table className="w-full table-fixed">
                                <colgroup>
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "25%" }} />
                                    <col style={{ width: "25%" }} />
                                </colgroup>
                                <thead className="text-gray-400 text-sm bg-black sticky top-0 z-10">
                                    <tr>
                                        <th className="py-3 px-6 text-left font-bold text-xl">
                                            Title
                                        </th>
                                        <th className="py-3 px-6 text-left font-bold text-xl">
                                            Category
                                        </th>
                                        <th className="py-3 px-6 text-left font-bold text-xl">
                                            Date
                                        </th>
                                        <th className="py-3 px-6 text-right font-bold text-xl">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="overflow-y-auto max-h-[200px] rounded-b-2xl">
                                <table className="w-full table-fixed">
                                    <colgroup>
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                        <col style={{ width: "25%" }} />
                                    </colgroup>
                                    <tbody className="divide-y divide-gray-800 text-gray-200">
                                        {recentExpenses && recentExpenses.length > 0 ? (
                                            recentExpenses.map((expense) => (
                                                <tr
                                                    key={expense._id}
                                                    className={`${expense.type === "expense"
                                                        ? "bg-red-600"
                                                        : "bg-green-600"
                                                        }`}
                                                >
                                                    <td className="py-4 px-6">{expense.title || "—"}</td>
                                                    <td className="py-4 px-6">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getCategoryBadgeClasses(
                                                                expense.category
                                                            )}`}
                                                        >
                                                            {expense.category || "Uncategorized"}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {expense.date
                                                            ? new Date(expense.date).toLocaleDateString()
                                                            : "—"}
                                                    </td>
                                                    <td className="py-4 px-6 text-right font-semibold">
                                                        {formatAmount(expense.amount)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="py-8 px-6 text-center text-gray-400"
                                                    colSpan={4}
                                                >
                                                    {loaderData?.success === false ?
                                                        'Please sign in to view your dashboard data.' :
                                                        'No expenses yet'
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
