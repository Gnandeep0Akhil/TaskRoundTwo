import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token === "developer") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">Application</div>
      <div className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className="sidebar-nav-item"
          activeClassName="active"
        >
          Dashboard
        </NavLink>
      </div>
      {isAdmin && (
        <div className="sidebar-nav">
          <NavLink
            to="/manage-users"
            className="sidebar-nav-item"
            activeClassName="active"
          >
            Manage Users
          </NavLink>
        </div>
      )}
      <div className="sidebar-log">
        <div
          className="sidebar-nav-item"
          activeClassName="active"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <div className="sidebar-footer">© 2024 Application</div>
    </div>
  );
}

export default Sidebar;
