import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/Header.css';
import { FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaChevronDown, FaProductHunt } from 'react-icons/fa';
import DataContext from '../context/DataProvider';

export const Header = () => {
  const {user,setUser} = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout =async() => {
    setUser({...user,userName:'',mail:''});
    localStorage.removeItem("token");
    navigate("/login");
  };

  const displayName = user.userName;

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="https://img.icons8.com/color/96/user.png"
          // src='https://img.icons8.com/officel/96/test-account.png'
          alt="Profile"
          className="profile-picture"
          onClick={()=>navigate("/profile")}
        />
        <div className="logo" onClick={() => navigate('/home')}>
          <h4>IntelliQuest</h4>
          <p>{displayName}</p>
        </div>
      </div>
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
          <button onClick={() =>navigate('/login')}>
            <FaSignInAlt /> <span>Login</span>
          </button>
        )}
      </nav>
    </header>
  );
};
