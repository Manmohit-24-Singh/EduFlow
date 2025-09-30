import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../images/logo.jpg';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="LMS Logo" className="logo" />
        </Link>
      </div>
      <h2>LMS - Learning Management System</h2>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/courses" className="nav-link">Courses</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
      </nav>
    </header>
  );
}

export default Header;