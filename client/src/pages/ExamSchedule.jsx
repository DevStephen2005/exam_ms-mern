// pages/ExamSchedule.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchVenue, setSearchVenue] = useState("");

  // Fetch exams on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/exams");
        setExams(response.data);
        setFilteredExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = exams;

    if (searchName.trim()) {
      filtered = filtered.filter((exam) =>
        exam.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter((exam) => exam.date === searchDate);
    }

    if (searchVenue.trim()) {
      filtered = filtered.filter((exam) =>
        exam.venue.toLowerCase().includes(searchVenue.toLowerCase())
      );
    }

    setFilteredExams(filtered);
  }, [searchName, searchDate, searchVenue, exams]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Exam Schedule</h2>

      {/* Search Filters */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by Exam Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm"
        />

        <input
          type="text"
          placeholder="Search by Venue"
          value={searchVenue}
          onChange={(e) => setSearchVenue(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm"
        />
      </div>

      {/* Exam List */}
      {filteredExams.length === 0 ? (
        <p className="text-center text-gray-600">No exams match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div key={exam._id} className="bg-white p-4 rounded shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{exam.name}</h3>
              <p><span className="font-medium">Date:</span> {exam.date}</p>
              <p><span className="font-medium">Time:</span> {exam.time}</p>
              <p><span className="font-medium">Duration:</span> {exam.duration}</p>
              <p><span className="font-medium">Venue:</span> {exam.venue}</p>
              <p><span className="font-medium">Seats Left:</span> {exam.capacity - exam.registeredCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamSchedule;
