import React, { useContext, useEffect } from "react";
import "../Navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUserCircle } from "react-icons/fa";

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
    if (!user) return null; // Return nothing if no user is logged in

    // Client user (role_id 2)
    if (user.role_id === 2) {
      return (
        <a href="/editclientprofile">
          {user.profile_picture_url ? (
            <img
              src={user.profile_picture_url}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <FaUserCircle className="user-icon" />
          )}
        </a>
      );
    }

    // Restaurant user (role_id 3)
    if (user.role_id === 3) {
      return (
        <a href="/editrestaurantprofile">
          {user.profile_picture_url ? (
            <img
              src={user.profile_picture_url}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <FaUserCircle className="user-icon" />
          )}
        </a>
      );
    }

    return null; // Default case
  };

  return (
    <div id="navbar">
      <nav>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/signup", { state: { isLogin: true } })}
            >
              Login
            </a>
          </li>
          <li>
            <a href="/createmeal">createmeal</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
          <li>
            <a href="/restaurantslist">restaurants</a>
          </li>
          <li>
            <a href="/meals">meals</a>
          </li>
          <li>{renderProfileIcon()}</li>
          <li>
            <a href="/">Home </a>
          </li>

          <li>
            <a
              onClick={() => navigate("/signup", { state: { isLogin: true } })}
            >
              Login
            </a>
          </li>

          {user && user.role_id === 3 && (
            <>
              <li>
                <a href="/createmeal">createmeal</a>
              </li>
              <li>
                <a href="/restdash">Dashboard</a>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <a href="/editprofile">{renderProfileIcon()}</a>
              </li>
            </>
          )}
          <li>
            <a href="/restaurantslist">restaurants</a>
          </li>
          <li>
            <a href="/meals">meals</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
