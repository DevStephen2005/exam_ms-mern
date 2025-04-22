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

function App() {

  return (
    <>
      {/* Toast  */}
      <ToastContainer />
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<RegisterPage />} ></Route>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/exam_register" element={<ExamRegistrationForm />} ></Route>
        <Route path="/student_dashboard" element={<StudentDashboard />} ></Route>
        <Route path="/my_registrations" element={<MyRegistrations />} />
        <Route path="/register_success" element={<RegistrationSuccess />} ></Route>
        <Route path="/exam_schedule" element={<ExamSchedule />} ></Route>


      </Routes>
    
    </Router>
    </>
  )
}

export default App
