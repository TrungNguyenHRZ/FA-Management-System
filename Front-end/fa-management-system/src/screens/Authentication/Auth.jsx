import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
