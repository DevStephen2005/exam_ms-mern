import { useState } from "react";

const dummyRegistrations = [
  { id: 1, examTitle: "Maths - Semester 1", date: "2025-06-01", department: "CSE", status: "Registered" },
  { id: 2, examTitle: "Physics - Final", date: "2025-06-05", department: "CSE", status: "Registered" },
  { id: 3, examTitle: "English - Internal", date: "2025-06-10", department: "CSE", status: "Registered" },
];

const AllRegistrations = () => {
  const [registrations, setRegistrations] = useState(dummyRegistrations);
  const [search, setSearch] = useState("");

  const filtered = registrations.filter((reg) =>
    reg.examTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Exam Registrations</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by exam title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Exam Title</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Department</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No registrations found.
                </td>
              </tr>
            ) : (
              filtered.map((reg) => (
                <tr key={reg.id} className="border-t">
                  <td className="px-6 py-4">{reg.examTitle}</td>
                  <td className="px-6 py-4">{reg.date}</td>
                  <td className="px-6 py-4">{reg.department}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRegistrations;
