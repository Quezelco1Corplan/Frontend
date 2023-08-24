import "./App.css";
import "./css/Login.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import NavigationBar from "./pages/NavigationBar";
import UserManagement from "./pages/userManagement";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<UserManagement />} />
          <Route path="/update/:id" element={<Update />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
