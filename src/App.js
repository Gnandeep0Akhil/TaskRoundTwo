import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import ManageUsers from "./Components/ManageUsers";
import authData from "./auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem("db", JSON.stringify(authData.users));
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
