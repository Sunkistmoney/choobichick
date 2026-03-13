import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EggProductionPage() {
  const records = await prisma.eggProduction.findMany({
    orderBy: { date: "desc" },
  });

  const totals = records.reduce(
    (acc, r) => ({
      totalEggs: acc.totalEggs + r.totalEggs,
      brokenEggs: acc.brokenEggs + r.brokenEggs,
      unsellableEggs: acc.unsellableEggs + r.unsellableEggs,
      sellableEggs: acc.sellableEggs + r.sellableEggs,
    }),
    { totalEggs: 0, brokenEggs: 0, unsellableEggs: 0, sellableEggs: 0 }
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Egg Production</h2>
        <Link
          href="/egg-production/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Add Production Record
        </Link>
      </div>

      {records.length === 0 ? (
        <p className="text-gray-500 text-sm">No production records yet.</p>
      ) : (
        <>
          {/* Summary row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { label: "Total Eggs", value: totals.totalEggs, color: "text-gray-800" },
              { label: "Broken", value: totals.brokenEggs, color: "text-red-600" },
              { label: "Unsellable", value: totals.unsellableEggs, color: "text-orange-600" },
              { label: "Sellable", value: totals.sellableEggs, color: "text-green-700" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white border border-gray-200 rounded p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                <p className={`text-2xl font-semibold ${color}`}>{value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Records table */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Total Eggs</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Broken</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Unsellable</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Sellable</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{record.date.toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">{record.totalEggs}</td>
                    <td className="px-4 py-3 text-right text-red-600">{record.brokenEggs}</td>
                    <td className="px-4 py-3 text-right text-orange-600">{record.unsellableEggs}</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">
                      {record.sellableEggs}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{record.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
