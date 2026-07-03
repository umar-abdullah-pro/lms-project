import { Children } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
