import Link from "next/link";
import { addEggSale } from "@/lib/actions";

export default function NewSalePage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/sales" className="text-sm text-gray-500 hover:text-gray-700">
          ← Sales
        </Link>
        <h2 className="text-lg font-medium">Add Egg Sale</h2>
      </div>

      <form
        action={addEggSale}
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

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="boxesSold" className="block text-sm font-medium text-gray-700 mb-1">
              Boxes Sold <span className="text-red-500">*</span>
            </label>
            <input
              id="boxesSold"
              name="boxesSold"
              type="number"
              min="1"
              required
              placeholder="e.g. 10"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="piecesPerBox" className="block text-sm font-medium text-gray-700 mb-1">
              Pieces / Box <span className="text-red-500">*</span>
            </label>
            <input
              id="piecesPerBox"
              name="piecesPerBox"
              type="number"
              min="1"
              required
              defaultValue={100}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pricePerBox" className="block text-sm font-medium text-gray-700 mb-1">
            Price per Box (₱) <span className="text-red-500">*</span>
          </label>
          <input
            id="pricePerBox"
            name="pricePerBox"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="e.g. 350.00"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Total revenue = boxes sold × price per box (calculated automatically).
          </p>
        </div>

        <div>
          <label htmlFor="buyer" className="block text-sm font-medium text-gray-700 mb-1">
            Buyer <span className="text-gray-400 font-normal">optional</span>
          </label>
          <input
            id="buyer"
            name="buyer"
            type="text"
            placeholder="e.g. Jollibee Supplier"
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
            Save Sale
          </button>
          <Link
            href="/sales"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
