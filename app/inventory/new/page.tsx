import Link from "next/link";
import { addInventoryItem } from "@/lib/actions";

export default function NewInventoryItemPage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/inventory" className="text-sm text-gray-500 hover:text-gray-700">
          ← Inventory
        </Link>
        <h2 className="text-lg font-medium">Add Inventory Item</h2>
      </div>

      <form
        action={addInventoryItem}
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
            placeholder="e.g. Layer Pellets"
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
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select category</option>
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
              placeholder="e.g. 50"
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
              placeholder="e.g. kg, bags, bottles"
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
            placeholder="e.g. 10"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Item will be marked "Low Stock" when quantity falls at or below this number.
          </p>
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date <span className="text-gray-400 font-normal">optional</span>
          </label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
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
            placeholder="Any additional notes..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded"
          >
            Save Item
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
