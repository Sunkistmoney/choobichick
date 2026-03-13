import Link from "next/link";
import { addEggProductionRecord } from "@/lib/actions";

export default function NewEggProductionPage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/egg-production" className="text-sm text-gray-500 hover:text-gray-700">
          ← Egg Production
        </Link>
        <h2 className="text-lg font-medium">Add Production Record</h2>
      </div>

      <form
        action={addEggProductionRecord}
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
          <label htmlFor="totalEggs" className="block text-sm font-medium text-gray-700 mb-1">
            Total Eggs Collected <span className="text-red-500">*</span>
          </label>
          <input
            id="totalEggs"
            name="totalEggs"
            type="number"
            min="0"
            required
            placeholder="e.g. 320"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="brokenEggs" className="block text-sm font-medium text-gray-700 mb-1">
              Broken Eggs
            </label>
            <input
              id="brokenEggs"
              name="brokenEggs"
              type="number"
              min="0"
              defaultValue={0}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="unsellableEggs" className="block text-sm font-medium text-gray-700 mb-1">
              Unsellable Eggs
            </label>
            <input
              id="unsellableEggs"
              name="unsellableEggs"
              type="number"
              min="0"
              defaultValue={0}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Sellable eggs = Total − Broken − Unsellable (calculated automatically on save).
        </p>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes <span className="text-gray-400 font-normal">optional</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="e.g. Reduced production due to heat stress"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded"
          >
            Save Record
          </button>
          <Link
            href="/egg-production"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
