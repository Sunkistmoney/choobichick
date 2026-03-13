import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function FinancePage() {
  const [revenueAgg, expenseAgg, recentSales, recentExpenses] = await Promise.all([
    prisma.eggSale.aggregate({ _sum: { totalRevenue: true } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.eggSale.findMany({ orderBy: { date: "desc" }, take: 5 }),
    prisma.expense.findMany({ orderBy: { date: "desc" }, take: 5 }),
  ]);

  const totalRevenue = revenueAgg._sum.totalRevenue ?? 0;
  const totalExpenses = expenseAgg._sum.amount ?? 0;
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-medium">Financial Summary</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Total Revenue
          </p>
          <p className="text-2xl font-semibold text-green-700">
            ₱{totalRevenue.toFixed(2)}
          </p>
          <Link href="/sales" className="text-xs text-gray-400 hover:text-gray-600 mt-2 inline-block">
            View sales →
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Total Expenses
          </p>
          <p className="text-2xl font-semibold text-red-700">
            ₱{totalExpenses.toFixed(2)}
          </p>
          <Link href="/expenses" className="text-xs text-gray-400 hover:text-gray-600 mt-2 inline-block">
            View expenses →
          </Link>
        </div>

        <div className={`bg-white border rounded p-5 ${netProfit >= 0 ? "border-green-200" : "border-red-200"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Net Profit
          </p>
          <p className={`text-2xl font-semibold ${netProfit >= 0 ? "text-green-700" : "text-red-700"}`}>
            ₱{netProfit.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-2">Revenue − Expenses</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Recent Sales</h3>
            <Link href="/sales" className="text-xs text-blue-600 hover:underline">View all</Link>
          </div>
          {recentSales.length === 0 ? (
            <p className="text-xs text-gray-400">No sales yet.</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Date</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Boxes</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-3 py-2 text-xs">{sale.date.toLocaleDateString()}</td>
                      <td className="px-3 py-2 text-xs">{sale.boxesSold}</td>
                      <td className="px-3 py-2 text-xs font-medium text-green-700">
                        ₱{sale.totalRevenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Recent Expenses</h3>
            <Link href="/expenses" className="text-xs text-blue-600 hover:underline">View all</Link>
          </div>
          {recentExpenses.length === 0 ? (
            <p className="text-xs text-gray-400">No expenses yet.</p>
          ) : (
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Date</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Description</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-500 text-xs">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-3 py-2 text-xs">{expense.date.toLocaleDateString()}</td>
                      <td className="px-3 py-2 text-xs truncate max-w-[120px]">{expense.description}</td>
                      <td className="px-3 py-2 text-xs font-medium text-red-700">
                        ₱{expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
