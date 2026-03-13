import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ExpensesPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Expenses</h2>
        <Link
          href="/expenses/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Add Expense
        </Link>
      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-sm">No expenses recorded yet.</p>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded overflow-hidden mb-4">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[440px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{expense.date.toLocaleDateString()}</td>
                    <td className="px-4 py-3 capitalize">{expense.category}</td>
                    <td className="px-4 py-3">{expense.description}</td>
                    <td className="px-4 py-3 font-medium text-red-700">
                      ₱{expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="text-sm text-right text-gray-700">
            Total Expenses:{" "}
            <span className="font-semibold text-red-700">
              ₱{totalExpenses.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
