import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const GuestProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signup" replace />;

  return children;
};

export default GuestProtectedRoute;
