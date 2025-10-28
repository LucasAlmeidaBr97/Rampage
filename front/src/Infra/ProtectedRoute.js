import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../auth/AuthService";

const ProtectedRoute = ({ allowedRoles, checkout = false, children }) => {
  const userRole = localStorage.getItem("userRole"); // Recupera o role do localStorage

  if (!userRole || !allowedRoles.includes(userRole)) {
    if (checkout) {
      authService._logoutFunc();
      return <Navigate to="/checkout/login" replace />;
    }

    if (userRole && (userRole === "ADMIN" || userRole === "STOKIST")) {
      authService._logoutFunc();
      return <Navigate to="/back-home" replace />;
    }

    return <Navigate to="/pagina-principal" replace />;
  }

  return children;
};

export default ProtectedRoute;
