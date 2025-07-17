import { useState } from "react";

const dummyExams = [
  { id: 1, title: "Maths - Semester 1", date: "2025-06-01", department: "CSE" },
  { id: 2, title: "Physics - Final", date: "2025-06-05", department: "ECE" },
  { id: 3, title: "English - Internal", date: "2025-06-10", department: "EEE" },
];

const ManageExams = () => {
  const [exams, setExams] = useState(dummyExams);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", date: "", department: "" });

  const handleDelete = (id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  const handleEditClick = (exam) => {
    setEditingId(exam.id);
    setEditData({ title: exam.title, date: exam.date, department: exam.department });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === editingId ? { ...exam, ...editData } : exam
      )
    );
    setEditingId(null);
    setEditData({ title: "", date: "", department: "" });
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Manage Exams</h1>
      <p className="text-sm text-gray-500 mb-6">View, edit or delete upcoming exams.</p>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
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
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No exams found.
                </td>
              </tr>
            ) : (
              filteredExams.map((exam) => (
                <tr key={exam.id} className="border-t">
                  <td className="px-6 py-4">
                    {editingId === exam.id ? (
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      exam.title
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === exam.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      exam.date
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === exam.id ? (
                      <input
                        type="text"
                        name="department"
                        value={editData.department}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      exam.department
                    )}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {editingId === exam.id ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={handleEditSave}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEditClick(exam)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(exam.id)}
                    >
                      Delete
                    </button>
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

export default ManageExams;
