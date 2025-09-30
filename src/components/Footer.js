import React from 'react';
import '../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          &copy; {currentYear} Learning Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;