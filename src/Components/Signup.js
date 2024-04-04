import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureQuestion, setSecureQuestion] = useState("");
  const [secureAnswer, setSecureAnswer] = useState("");
  const [secureQuestionOptions] = useState([
    "What is your mother's maiden name?",
    "What city were you born in?",
    "What is the name of your first pet?",
    "What is your favorite book?",
  ]);
  const [userExists, setUserExists] = useState(false);

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, "");
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z]/g, "");
    setLastName(value);
  };

  const mergeNames = () => {
    return firstName.trim() + " " + lastName.trim();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = mergeNames();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userExists = await checkUserExists(username);
    setUserExists(userExists);

    if (userExists) {
      alert("User already exists!");
      return;
    }
    
    navigate("/login");
  };

  const checkUserExists = async (username) => {
    let result = false;
    const users = JSON.parse(localStorage.getItem("db"));
    users.forEach((user) => {
      if (user.username === username) {
        result = true;
      }
    });
    return result;
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={handleFirstNameChange}
            maxLength={64}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={handleLastNameChange}
            maxLength={64}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            maxLength={64}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            maxLength={64}
            required
          />
        </div>
        <div>
          <label>Secure Question:</label>
          <select
            value={secureQuestion}
            className="form-input"
            onChange={(event) => setSecureQuestion(event.target.value)}
            maxLength={64}
            required
          >
            <option value="">Select a question</option>
            {secureQuestionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            className="form-input"
            value={secureAnswer}
            onChange={(event) => setSecureAnswer(event.target.value)}
            maxLength={64}
            required
          />
        </div>
        {userExists && (
          <p className="error-message">
            User already exists! Please choose a different username.
          </p>
        )}
        <button type="submit" className="submit-button">
          Signup
        </button>
      </form>
      <br />
      <Link to="/login">Login?</Link>
    </div>
  );
}

export default Signup;
