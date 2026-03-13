import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage() {
  const items = await prisma.inventoryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Inventory</h2>
        <Link
          href="/inventory/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Add Inventory Item
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">No inventory items yet. Add your first one!</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Quantity</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Low Stock At</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Expiry Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => {
                const isLow = item.quantity <= item.lowStockThreshold;
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 capitalize">{item.category}</td>
                    <td className="px-4 py-3">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.lowStockThreshold} {item.unit}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.expiryDate ? item.expiryDate.toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          isLow
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isLow ? "Low Stock" : "OK"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/inventory/${item.id}/edit`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
