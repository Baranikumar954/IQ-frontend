import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/Header.css';
import { 
  FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, 
  FaSignOutAlt, FaChevronDown, FaProductHunt, FaBars, FaTimes 
} from 'react-icons/fa';
import DataContext from '../context/DataProvider';

export const Header = () => {
  const { user, setUser,profile } = useContext(DataContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setUser({ ...user, userName: '', mail: '' });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fullName = [profile.fullName, profile.sureName].filter(Boolean).join(" ");
  const displayName = fullName || user.userName;

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img
            src="https://img.icons8.com/color/96/user.png"
            alt="Profile"
            className="profile-picture"
            onClick={() => navigate("/profile")}
          />
          <div className="logo" onClick={() => navigate('/home')}>
            <h4>IntelliQuest</h4>
            <p>{displayName}</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <button onClick={() => navigate('/home')}>
            <FaHome /> <span>Home</span>
          </button>
          <button onClick={() => navigate('/about')}>
            <FaInfoCircle /> <span>About</span>
          </button>
          <button onClick={() => navigate('/contact')}>
            <FaEnvelope /> <span>Contact</span>
          </button>

          <div className="dropdown">
            <button className="dropdown-btn">
              <FaProductHunt /> Products <FaChevronDown />
            </button>
            <div className="dropdown-content">
              <button onClick={() => navigate('/question')}>Question Generation</button>
              <button onClick={() => navigate('/analyser')}>Resume Checker</button>
            </div>
          </div>

          {user ? (
            <button onClick={handleLogout}>
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          ) : (
            <button onClick={() => navigate('/login')}>
              <FaSignInAlt /> <span>Login</span>
            </button>
          )}
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>
          <FaBars size={22} />
        </button>
      </header>

      {/* Sidebar for Mobile */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
          <FaTimes size={22} />
        </button>
        <button onClick={() => { navigate('/home'); setIsSidebarOpen(false); }}>
          <FaHome /> Home
        </button>
        <button onClick={() => { navigate('/about'); setIsSidebarOpen(false); }}>
          <FaInfoCircle /> About
        </button>
        <button onClick={() => { navigate('/contact'); setIsSidebarOpen(false); }}>
          <FaEnvelope /> Contact
        </button>
        <button onClick={() => { navigate('/question'); setIsSidebarOpen(false); }}>
          <FaProductHunt /> Question Generation
        </button>
        <button onClick={() => { navigate('/analyser'); setIsSidebarOpen(false); }}>
          <FaProductHunt /> Resume Checker
        </button>
        {user ? (
          <button onClick={() => { handleLogout(); setIsSidebarOpen(false); }}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <button onClick={() => { navigate('/login'); setIsSidebarOpen(false); }}>
            <FaSignInAlt /> Login
          </button>
        )}
      </div>
    </>
  );
};
