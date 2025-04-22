import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for registering. You will receive further information via email or dashboard.
        </p>
        <Link to="/student_dashboard">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
