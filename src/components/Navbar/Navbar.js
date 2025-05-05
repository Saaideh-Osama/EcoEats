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
    navigate("/signup", { state: { isLogin: true } })
  };

  const renderProfileIcon = () => {
    if (user?.role_id === 3 && user?.profile_picture_url) {
      return <img src={user.image} alt="Profile" className="profile-picture" onClick={()=>navigate("/src/components/Restaurant/EditRestaurantProfile/EditRestaurantProfile.js")} />;
    } else {
      return <FaUserCircle className="user-icon" onClick={()=>navigate("/src/components/Client/EditProfile/EditUserProfile.js") }/>;
    }
  };

  return (
    <div id='navbar'>
      <nav>
        <ul>
          <li><a href='/'>Home </a></li>
          
          <li><a onClick={() => navigate("/signup", { state: { isLogin: true } })}>Login</a></li>
          
          {user&& user.role_id === 3 && <><li><a href='/createmeal'>createmeal</a></li>
          <li><a href='/restdash'>Dashboard</a></li></>}          
          {user &&<><li><button onClick={handleLogout}>Logout</button></li>
          <li>
          <a href='/editprofile'>
            {renderProfileIcon()}
          </a>
        </li></>
          }
          <li><a href='/restaurantslist'>restaurants</a></li>
          <li><a href='/meals'>meals</a></li>
          
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
