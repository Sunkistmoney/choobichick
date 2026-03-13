import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SalesPage() {
  const sales = await prisma.eggSale.findMany({
    orderBy: { date: "desc" },
  });

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalRevenue, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Egg Sales</h2>
        <Link
          href="/sales/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Add Sale
        </Link>
      </div>

      {sales.length === 0 ? (
        <p className="text-gray-500 text-sm">No sales recorded yet.</p>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded overflow-hidden mb-4">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[540px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Boxes Sold</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Pieces / Box</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Price / Box</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Total Revenue</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Buyer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{sale.date.toLocaleDateString()}</td>
                    <td className="px-4 py-3">{sale.boxesSold}</td>
                    <td className="px-4 py-3">{sale.piecesPerBox}</td>
                    <td className="px-4 py-3">₱{sale.pricePerBox.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium text-green-700">
                      ₱{sale.totalRevenue.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{sale.buyer ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="text-sm text-right text-gray-700">
            Total Revenue:{" "}
            <span className="font-semibold text-green-700">
              ₱{totalRevenue.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
