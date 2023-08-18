import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogout = () => {
    // Perform logout logic here
    // For example:

    // 1. Clear user session (assuming you're using browser cookies or local storage)
    localStorage.removeItem("userToken"); // Remove the user's authentication token

    // 2. Redirect the user to the login page
    navigate("/"); // Navigate to the login page using the `navigate` function
  };

  return (
    <div className="dashboard-content">
      <p>Dashboard content goes here...</p>
      {/* Add a logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
