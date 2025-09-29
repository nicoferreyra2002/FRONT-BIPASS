import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import Billboard from "./components/billboard/Billboard";
import AppNavbar from "./components/navbar/Navbar"; 
import Contact from "./components/contacts/Contact";
import MyTickets from "./components/myTickets/MyTickets";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email === "test@example.com" && password === "Password123") {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert("Incorrect credentials.");
    }
  };

  const handleRegister = (userData) => {
    console.log('Registration data:', userData);
    alert('Registration successful! You can now log in.');
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      {/* Navbar only if logged in */}
      {isAuthenticated && <AppNavbar onLogout={handleLogout} />}

      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Dashboard route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
        {/* Contact route */}
        <Route
          path="/contact"
          element={
            isAuthenticated ? <Contact /> : <Navigate to="/" />
          }
        />
        {/* Billboard route */}
        <Route
          path="/billboard"
          element={
            isAuthenticated ? <Billboard /> : <Navigate to="/" />
          }
        />
          <Route
          path="/mytickets"
          element={
            isAuthenticated ? <MyTickets /> : <Navigate to="/" />
          }
        />

        {/* Register route */}
        <Route path="/register" element={<Register onRegister={handleRegister} />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
