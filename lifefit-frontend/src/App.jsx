import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Comparison from "./pages/Comparison";
import "./App.css";

export default function App() {
  return (
    <div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">LifeFit</h2>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Single City
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Compare Cities
          </NavLink>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Comparison />} />
      </Routes>

    </div>
  );
}
