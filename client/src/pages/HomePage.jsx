import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl bg-white rounded-2xl shadow-xl p-10 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">Welcome to Exam Registration</h1>
        <p className="text-gray-600 text-lg">
          Register for exams, view schedules, and manage your exam journey with ease.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-xl text-sm font-semibold hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>

        <div className="pt-6 border-t text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ExamMS. All rights reserved.
        </div>
      </div>

    </div>
    </>
  );
}
