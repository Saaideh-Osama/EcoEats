import React, { useContext, useEffect } from 'react';
import '../Navbar/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []); // empty dependency array = only run on mount

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const renderProfileIcon = () => {
    if (user?.role_id === 3 && user?.profile_picture_url) {
      return <img src={user.profile_picture_url} alt="Profile" className="profile-picture" />;
    } else {
      return <FaUserCircle className="user-icon" />;
    }
  };

  return (
    <div id='navbar'>
      <nav>
        <ul>
          <li><a href='/'>Home </a></li>
          <li><a onClick={() => navigate("/signup", { state: { isLogin: true } })}>Login</a></li>
          <li><a href='/createmeal'>createmeal</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
          <li><a href='/restaurantslist'>restaurants</a></li>
          <li><a href='/meals'>meals</a></li>
          <li>
            <a href='/editprofile'>
              {renderProfileIcon()}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
