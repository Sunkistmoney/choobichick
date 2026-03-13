import Link from "next/link";
import { addChicken } from "@/lib/actions";

export default function NewChickenPage() {
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/chickens" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back
        </Link>
        <h2 className="text-lg font-medium">Add Chicken</h2>
      </div>

      <form action={addChicken} className="bg-white border border-gray-200 rounded p-6 space-y-4">
        <div>
          <label htmlFor="tagId" className="block text-sm font-medium text-gray-700 mb-1">
            Tag ID <span className="text-red-500">*</span>
          </label>
          <input
            id="tagId"
            name="tagId"
            type="text"
            required
            placeholder="e.g. CHK-001"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
            Breed <span className="text-red-500">*</span>
          </label>
          <input
            id="breed"
            name="breed"
            type="text"
            required
            placeholder="e.g. Rhode Island Red"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
            Sex <span className="text-red-500">*</span>
          </label>
          <select
            id="sex"
            name="sex"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select sex</option>
            <option value="hen">Hen</option>
            <option value="rooster">Rooster</option>
          </select>
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
            Birth Date <span className="text-red-500">*</span>
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg) <span className="text-gray-400 font-normal">optional</span>
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g. 2.5"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded"
          >
            Save Chicken
          </button>
          <Link
            href="/chickens"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
