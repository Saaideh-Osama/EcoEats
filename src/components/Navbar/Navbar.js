import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import "../Navbar/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const renderProfileIcon = () => {
    if (!user) return null;

    const profileUrl = user.role_id === 2 ? "/editclient" : "/editrestaurant";

    return (
      <Link to={profileUrl}>
        {user.profile_picture_url ? (
          <img
            src={user.profile_picture_url}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <FaUserCircle className="user-icon" />
        )}
      </Link>
    );
  };

  return (
    <div id="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <li>
              <button
                onClick={() =>
                  navigate("/signup", { state: { isLogin: true } })
                }
              >
                Login
              </button>
            </li>
          )}
          {(!user || user.role_id === 2) && (
            <>
              <li>
                <a href="/restaurantslist">Restaurants</a>
              </li>
              <li>
                <a href="/meals">Meals</a>
              </li>
            </>
          )}

          {user && user.role_id === 3 && (
            <>
              <li>
                <Link to="/createmeal">Create Meal</Link>
              </li>
              <li>
                <Link to="/restdash">Dashboard</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li>{renderProfileIcon()}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
