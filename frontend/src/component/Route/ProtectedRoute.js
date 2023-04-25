import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated = false }) => {
  const { isAdmin, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (user.role !== "admin") {
  }
  if (isAuthenticated === false) {
    return navigate("/login");
  }

  if (isAuthenticated === true && user.role !== "admin") {
    return navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
