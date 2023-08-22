import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useNavigate for navigation

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const logout = () => {
    setIsLoggedIn(false); // Set authentication state
    navigate("/");
  };

  return (
    <div className="dashboard-content">
      <p>Dashboard content goes here...</p>
      {/* Add a logout button */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
