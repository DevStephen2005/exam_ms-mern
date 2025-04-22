import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const userName = localStorage.getItem("userName"); // Retrieve user's name from localStorage

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('http://localhost:8000/exams');
        setExams(res.data);
      } catch (err) {
        console.error('Error fetching exams:', err);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Welcome message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {userName ? userName : 'Student'}!
        </h2>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Available Exams
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div key={exam._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-800">{exam.name}</h3>
              <p><strong className="font-semibold">Date:</strong> {exam.date}</p>
              <p><strong className="font-semibold">Time:</strong> {exam.time}</p>
              <p><strong className="font-semibold">Duration:</strong> {exam.duration}</p>
              <p><strong className="font-semibold">Venue:</strong> {exam.venue}</p>
              <p><strong className="font-semibold">Seats Left:</strong> {exam.capacity - exam.registeredCount}</p>
              <Link to="/exam_register">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Register
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
