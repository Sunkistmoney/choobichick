import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ChickensPage() {
  const chickens = await prisma.chicken.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Chickens</h2>
        <Link
          href="/chickens/new"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Add Chicken
        </Link>
      </div>

      {chickens.length === 0 ? (
        <p className="text-gray-500 text-sm">No chickens yet. Add your first one!</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tag ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Breed</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Sex</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Birth Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chickens.map((chicken) => (
                <tr key={chicken.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">
                    <Link href={`/chickens/${chicken.id}`} className="text-green-700 hover:underline">
                      {chicken.tagId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/chickens/${chicken.id}`} className="block">
                      {chicken.breed}
                    </Link>
                  </td>
                  <td className="px-4 py-3 capitalize">
                    <Link href={`/chickens/${chicken.id}`} className="block">
                      {chicken.sex}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/chickens/${chicken.id}`} className="block">
                      {chicken.birthDate.toLocaleDateString()}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/chickens/${chicken.id}`} className="block">
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
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
