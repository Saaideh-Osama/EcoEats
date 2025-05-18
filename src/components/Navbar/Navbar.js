import React, { useContext, useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import "../Navbar/Navbar.css";
import AlertModal from "../Alerts/AlertModal";
import ConfirmModal from "../Alerts/ConfirmModal";
function Navbar() {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
 const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    setShowConfirm(true); // Ask for confirmation first
  };

  const confirmLogout = () => {
    // Proceed with logout
    localStorage.removeItem("authToken");
    setShowConfirm(false);
    setShowAlert(true); // Show success alert
    navigate("/signup", { state: { isLogin: true } });
  };

  const cancelLogout = () => {
    setShowConfirm(false);
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
              <a
                onClick={() =>
                  navigate("/signup", { state: { isLogin: true } })
                }
              >
                Login
              </a>
            </li>
          )}
          {(!user || user.role_id === 2) && (
            <>
              <li>
                <a href="/restaurantslist">Restaurants</a>
              </li>
              <li>
                <a href="/clientmain">Browse</a>
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
       {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      {showAlert && (
        <AlertModal
          type="success"
          message="You have been logged out successfully."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
