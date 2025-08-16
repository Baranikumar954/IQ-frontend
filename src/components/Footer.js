import React from 'react'
import { Link } from 'react-router-dom';
import '../PageStyles/Footer.css';

export const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-info">
            <p>&copy; 2025 <a href="https://baranikumar954.github.io/myWebsiteBk/" style={{ textDecoration: "none" }}>Baranikumar B </a>| All Rights Reserved</p>

          </div>
        </div>
      </footer>

    </div>
  )
}
