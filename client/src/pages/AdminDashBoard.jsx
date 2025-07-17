import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token");  // clear token
      navigate("/login");                // redirect to login
    };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white shadow-md">
        <div className="p-6 text-2xl font-bold text-blue-500">Admin Panel</div>
        <nav className="px-4">
          <ul className="space-y-4 text-base">
            <li>
              <a href="#" className="block hover:text-blue-400 cursor-pointer">
                Dashboard
              </a>
            </li>

            
            <li>
            <Link to='/manage_students'>
              <a href="#" className="block hover:text-blue-400 cursor-pointer">
                Manage Students
              </a>
              </Link>
            </li>

            <li>
              <Link to='/manage_exams' >
              <a href="#" className="block hover:text-blue-400 cursor-pointer">
                Manage Exams
              </a>
              </Link>

            </li>
            <li>
              <Link to='/all_registrations'>
              <a href="#" className="block hover:text-blue-400 cursor-pointer">
                Registrations
              </a>
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome, Admin</h1>
          <p className="text-gray-500">Here’s the summary of the exam registration system.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Exams</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">3</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-800">Registrations</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">2</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
