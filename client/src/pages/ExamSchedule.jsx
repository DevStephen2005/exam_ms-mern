// pages/ExamSchedule.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchVenue, setSearchVenue] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:8000/exams");
        setExams(res.data);
        setFilteredExams(res.data);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

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

    if (searchVenue) {
      filtered = filtered.filter((exam) =>
        exam.venue.toLowerCase().includes(searchVenue.toLowerCase())
      );
    }

    setFilteredExams(filtered);
  }, [searchName, searchDate, searchVenue, exams]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Exam Schedule</h2>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by Exam Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Search by Venue"
          value={searchVenue}
          onChange={(e) => setSearchVenue(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Exam Cards */}
      {filteredExams.length === 0 ? (
        <p>No exams match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div key={exam._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{exam.name}</h3>
              <p><strong>Date:</strong> {exam.date}</p>
              <p><strong>Time:</strong> {exam.time}</p>
              <p><strong>Duration:</strong> {exam.duration}</p>
              <p><strong>Venue:</strong> {exam.venue}</p>
              <p><strong>Seats Left:</strong> {exam.capacity - exam.registeredCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamSchedule;
