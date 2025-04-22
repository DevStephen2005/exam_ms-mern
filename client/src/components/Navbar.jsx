// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">ExamRegSys</Link>
      </h1>

      <div className="space-x-4">
        {role === 'admin' ? (
          <>
            <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/add-exam" className="hover:underline">Add Exam</Link>
            <Link to="/view-registrations" className="hover:underline">View Registrations</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/exam-schedule" className="hover:underline">Exam Schedule</Link>
            <Link to="/my-registrations" className="hover:underline">My Exams</Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
