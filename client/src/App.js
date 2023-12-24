import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing.jsx";
import Login from "./Pages/Login/LoginPage.jsx";
import Register from "./Pages/Register/RegisterPage.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
