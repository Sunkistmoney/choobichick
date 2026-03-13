import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ChickenDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const chicken = await prisma.chicken.findUnique({
    where: { id },
    include: {
      feedingSchedules: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!chicken) notFound();

  return (
    <div className="max-w-3xl space-y-8">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <Link href="/chickens" className="text-sm text-gray-500 hover:text-gray-700">
          ← Chickens
        </Link>
        <h2 className="text-lg font-medium">{chicken.tagId}</h2>
      </div>

      {/* Chicken info card */}
      <div className="bg-white border border-gray-200 rounded p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Chicken Info
        </h3>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-gray-500">Tag ID</dt>
            <dd className="font-mono font-medium">{chicken.tagId}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Breed</dt>
            <dd>{chicken.breed}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Sex</dt>
            <dd className="capitalize">{chicken.sex}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Birth Date</dt>
            <dd>{chicken.birthDate.toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Weight</dt>
            <dd>{chicken.weight != null ? `${chicken.weight} kg` : "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Status</dt>
            <dd>
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${
                  chicken.status === "active"
                    ? "bg-green-100 text-green-700"
                    : chicken.status === "sold"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {chicken.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Feeding schedules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium">Feeding Schedules</h3>
          <Link
            href={`/chickens/${chicken.id}/feeding/new`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
          >
            Add Feeding Schedule
          </Link>
        </div>

        {chicken.feedingSchedules.length === 0 ? (
          <p className="text-gray-500 text-sm">No feeding schedules yet.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Feed Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Quantity</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Time</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Notes</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chicken.feedingSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{schedule.feedType}</td>
                    <td className="px-4 py-3">
                      {schedule.quantity} {schedule.unit}
                    </td>
                    <td className="px-4 py-3">{schedule.feedingTime}</td>
                    <td className="px-4 py-3 text-gray-500">{schedule.notes ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          schedule.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {schedule.isActive ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
