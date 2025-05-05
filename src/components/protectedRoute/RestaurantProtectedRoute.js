import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RestaurantProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!user || user.role_id !== 3) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RestaurantProtectedRoute;
