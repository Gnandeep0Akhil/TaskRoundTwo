import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const MAX_LOGIN_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 24 * 60 * 60 * 1000;
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const users = localStorage.getItem("db");
    setUsers(JSON.parse(users));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      setUsernameError("Username is required.");
      return;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    } else {
      setPasswordError("");
    }

    const user = users.find((user) => user.username === username);

    if (!user) {
      setUsernameError("User does not exist.");
      setPasswordError("");
      return;
    }

    if (user.isAccountLocked) {
      alert("Your account is blocked. Please retry after 24 hours.");
      return;
    }

    if (user.password === password) {
      alert("Login successful!");
      setUsernameError("");
      setPasswordError("");
      setLoginAttempts(0);

      localStorage.setItem("user", user.username);
      navigate("/");
    } else {
      if (!!user.isAdmin) {
        setPasswordError("Incorrect password.");
      } else {
        setLoginAttempts((prevAttempts) => prevAttempts + 1);
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS - 1) {
          user.isAccountLocked = true;
          setTimeout(() => {
            user.isAccountLocked = false;
            setLoginAttempts(0);
          }, LOCKOUT_DURATION);
        }
        setPasswordError("Incorrect password.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            maxLength={64}
            required
          />
        </div>
        {usernameError && <p className="error-message">{usernameError}</p>}
        <div className="password-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            maxLength={64}
            required
          />
          <button
            type="button"
            className="toggle-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <br />
      <Link to="/signup">Signup?</Link>
    </div>
  );
}

export default Login;
