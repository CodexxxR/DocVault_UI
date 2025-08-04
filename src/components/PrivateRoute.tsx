// src/auth/PrivateRoute.tsx
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { userManager } from "../auth/AuthService";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    userManager.getUser().then(user => {
      setIsAuthenticated(!!(user && !user.expired));
    });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
