import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateInventoryItem } from "@/lib/actions";

export default async function EditInventoryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.inventoryItem.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateInventoryItem.bind(null, item.id);

  // Format date to YYYY-MM-DD for the date input default value
  const expiryValue = item.expiryDate
    ? item.expiryDate.toISOString().split("T")[0]
    : "";

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/inventory" className="text-sm text-gray-500 hover:text-gray-700">
          ← Inventory
        </Link>
        <h2 className="text-lg font-medium">Edit — {item.name}</h2>
      </div>

      <form
        action={action}
        className="bg-white border border-gray-200 rounded p-6 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={item.name}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={item.category}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="feed">Feed</option>
            <option value="vitamins">Vitamins</option>
            <option value="medicine">Medicine</option>
            <option value="vaccine">Vaccine</option>
            <option value="supplies">Supplies</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={item.quantity}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit <span className="text-red-500">*</span>
            </label>
            <input
              id="unit"
              name="unit"
              type="text"
              required
              defaultValue={item.unit}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-1">
            Low Stock Threshold <span className="text-red-500">*</span>
          </label>
          <input
            id="lowStockThreshold"
            name="lowStockThreshold"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={item.lowStockThreshold}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date <span className="text-gray-400 font-normal">optional</span>
          </label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            defaultValue={expiryValue}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes <span className="text-gray-400 font-normal">optional</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={item.notes ?? ""}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded"
          >
            Save Changes
          </button>
          <Link
            href="/inventory"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
