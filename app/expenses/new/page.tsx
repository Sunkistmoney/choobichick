import Link from "next/link";
import { addExpense } from "@/lib/actions";

export default function NewExpensePage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/expenses" className="text-sm text-gray-500 hover:text-gray-700">
          ← Expenses
        </Link>
        <h2 className="text-lg font-medium">Add Expense</h2>
      </div>

      <form
        action={addExpense}
        className="bg-white border border-gray-200 rounded p-6 space-y-4"
      >
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
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
            <option value="utilities">Utilities</option>
            <option value="equipment">Equipment</option>
            <option value="labor">Labor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            placeholder="e.g. 50kg Layer Pellets from AgriStore"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₱) <span className="text-red-500">*</span>
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="e.g. 2500.00"
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
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded"
          >
            Save Expense
          </button>
          <Link
            href="/expenses"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
