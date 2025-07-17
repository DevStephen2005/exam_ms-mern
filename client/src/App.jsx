import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ExamRegistrationForm from "./pages/ExamRegistrationForm";
import MyRegistrations from "./pages/MyRegistrations";
import ExamSchedule from "./pages/ExamSchedule";
import StudentDashboard from "./pages/StudentDashboard";
import RegistrationSuccess from "./pages/RegistrationSuccess";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/AdminDashBoard";
import ManageStudents from "./pages/ManageStudents";
import ManageExams from "./pages/ManageExams";
import AllRegistrations from "./pages/AllRegistrations";

function App() {

  return (
    <>
      {/* Toast  */}
      <ToastContainer />
      <Router>
      <Routes>
        {/* // user routes  */}

        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<RegisterPage />} ></Route>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/exam_register" element={<ExamRegistrationForm />} ></Route>
        <Route path="/student_dashboard" element={<StudentDashboard />} ></Route>
        <Route path="/my_registrations" element={<MyRegistrations />} />
        <Route path="/register_success" element={<RegistrationSuccess />} ></Route>
        <Route path="/exam_schedule" element={<ExamSchedule />} ></Route>

        {/* // admin routes  */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} ></Route>
        <Route path="/manage_students" element={<ManageStudents />} ></Route>
        <Route path="/manage_exams" element={<ManageExams />} ></Route>
        <Route path="/all_registrations" element={<AllRegistrations />} ></Route>



      </Routes>
    
    </Router>
    </>
  )
}

export default App
