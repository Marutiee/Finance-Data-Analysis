import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PowerBIEmbed from "./components/PowerBIEmbed";
import i1 from "./assets/i1.jpg";
import i2 from "./assets/i2.jpg";
import "./App.css";

const Home = () => (
  <div className="page-content home">
    <h2 className="fade-in">Welcome to the Financial Data</h2>
    <p className="fade-in delay-1">
      Our Finance Dashboard offers a unified platform to visualize, track, and analyze
      your organization’s financial performance in real-time. Built with modern web
      technologies and integrated with Power BI, it transforms raw financial data into
      clear, actionable insights.
    </p>

    <div className="image-grid fade-in delay-2">
      <img src={i1} alt="Financial Insight" />
      <img src={i2} alt="Dashboard Example" />
    </div>

    <p className="fade-in delay-3">
      With intuitive visualizations and an interactive interface, our dashboard enables
      both technical and non-technical users to effortlessly explore metrics such as
      revenue trends, expense breakdowns, and profit margins. The goal is to simplify
      financial reporting and provide decision-makers with the clarity they need.
    </p>

    <p className="fade-in delay-4">
      Whether you're a startup managing your growth or a large enterprise aiming to
      optimize financial workflows, this dashboard is designed to adapt and scale with
      your business needs. Experience financial intelligence — clearly, efficiently,
      and securely.
    </p>
  </div>
);


const About = () => (
  <div className="page-content about">
    <h2 className="fade-in">About Us</h2>
    <p className="fade-in delay-1">
      We are a passionate team of developers, data analysts, and financial experts on a mission
      to simplify complex financial data for businesses.
    </p>

    <div className="feature-list fade-in delay-2">
      <div className="feature-card">
        <h3>📊 Interactive Dashboards</h3>
        <p>Real-time visuals and charts that help managers and stakeholders stay informed.</p>
      </div>
      <div className="feature-card">
        <h3>💹 Trend Analysis</h3>
        <p>Track and compare financial patterns, spending behavior, and ROI over time.</p>
      </div>
      <div className="feature-card">
        <h3>🔒 Secure Access</h3>
        <p>All data is handled with high security protocols and encrypted connections.</p>
      </div>
    </div>

    <div className="fade-in delay-3 centered-section">
      <h3>Our Mission</h3>
      <p>
        Empower businesses with modern analytics tools that provide clarity,
        improve forecasting, and drive smarter financial decisions.
      </p>
    </div>

    
  </div>
);

const Dashboards = () => (
  <div className="page-content">
    <h2 id="reportTabName" className="app-subtitle">Loading...</h2>
    <PowerBIEmbed />
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboards" element={<Dashboards />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
