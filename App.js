import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const App = () => {
  return (
    <div className="landing-page">
      <h1 className="title">Patient Data Management</h1>
      <p className="subtitle">Securely store and manage patient medical records.</p>
      <div className="links">
        <Link to="/doctors" className="link-button">Doctor Dashboard</Link>
        <Link to="/patients" className="link-button">Patient Dashboard</Link>
      </div>
    </div>
  );
};

export default App;
