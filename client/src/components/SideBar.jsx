import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // clear token
    navigate("/login");                // redirect to login
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between min-h-screen">
      <div>
        <h2 className="text-2xl font-semibold mb-8 text-center">Dashboard</h2>
        <ul className="space-y-8">
          <li>
            <Link to="/student_dashboard" className="hover:text-blue-400 font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-blue-400 font-semibold">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/exam_register" className="hover:text-blue-400 font-semibold">
              Register for Exam
            </Link>
          </li>

          <li>
            <Link to="/my_registrations" className="hover:text-blue-400 font-semibold">
              Registered Exams
            </Link>
          </li>

          <li>
            <Link to="/exam_schedule" className="hover:text-blue-400 font-semibold">
              Exam  Schedules
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-md w-max text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
