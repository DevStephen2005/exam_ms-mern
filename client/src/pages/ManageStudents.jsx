import { useEffect, useState } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  // Dummy departments
  const departments = ["CIVIL", "ECE", "EEE", "MECH", "CSE"];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/students");
      const filtered = res.data
        .filter((s) => s.name.toLowerCase() !== "admin")
        .map((s) => ({
          ...s,
          // Assign a stable random department once
          dummyDepartment: departments[
            Math.floor(
              // This ensures the same department each time (based on student id)
              Math.abs(
                s._id
                  .split("")
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0)
              ) % departments.length
            )
          ],
        }));
      setStudents(filtered);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/students/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditData({
      name: student.name,
      email: student.email,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/students/${editingId}`,
        {
          name: editData.name,
          email: editData.email,
        }
      );
      setStudents((prev) =>
        prev.map((s) =>
          s._id === editingId
            ? { ...res.data, dummyDepartment: s.dummyDepartment }
            : s
        )
      );
      setEditingId(null);
      setEditData({ name: "", email: "" });
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Manage Students
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Add, view, update, or remove students.
      </p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
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
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Department</th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id} className="border-t">
                  {/* Name */}
                  <td className="px-6 py-4">
                    {editingId === student._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      student.name
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">{student.email}</td>

                  {/* Department */}
                  <td className="px-6 py-4">{student.dummyDepartment}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center space-x-2">
                    {editingId === student._id ? (
                      <button
                        onClick={handleEditSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(student)}
                        className="bg-green-600 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

export default ManageStudents;
