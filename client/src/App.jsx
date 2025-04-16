import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/profile" element={<Profile />} ></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />} ></Route>



      </Routes>
    
    </Router>
  )
}

export default App
