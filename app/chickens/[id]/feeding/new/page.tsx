import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { addFeedingSchedule } from "@/lib/actions";

export default async function NewFeedingSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const chicken = await prisma.chicken.findUnique({
    where: { id },
    select: { id: true, tagId: true },
  });

  if (!chicken) notFound();

  const action = addFeedingSchedule.bind(null, chicken.id);

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/chickens/${chicken.id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← {chicken.tagId}
        </Link>
        <h2 className="text-lg font-medium">Add Feeding Schedule</h2>
      </div>

      <form
        action={action}
        className="bg-white border border-gray-200 rounded p-6 space-y-4"
      >
        <div>
          <label htmlFor="feedType" className="block text-sm font-medium text-gray-700 mb-1">
            Feed Type <span className="text-red-500">*</span>
          </label>
          <input
            id="feedType"
            name="feedType"
            type="text"
            required
            placeholder="e.g. Corn, Pellets, Scratch"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
              placeholder="e.g. 0.5"
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
              placeholder="e.g. kg, cups, lbs"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="feedingTime" className="block text-sm font-medium text-gray-700 mb-1">
            Feeding Time <span className="text-red-500">*</span>
          </label>
          <input
            id="feedingTime"
            name="feedingTime"
            type="text"
            required
            placeholder="e.g. 07:00 AM, Morning, Twice daily"
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
            Save Schedule
          </button>
          <Link
            href={`/chickens/${chicken.id}`}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 px-5 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
