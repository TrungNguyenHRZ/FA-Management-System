import React, { useState } from "react";
import "./login.css";
import { FaUserLarge, FaLock } from "react-icons/fa6";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e, inputType) => {
    const value = e.target.value;
    if (inputType === "username") {
      setUserName(value);
    } else if (inputType === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log("User name: ", userName);
    console.log("Password: ", password);
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <FaUserLarge className="input-icon" />
          <input
            type="text"
            placeholder="Usename"
            value={userName}
            onChange={(e) => handleInputChange(e, "username")}
          />
        </div>
        <div className="input">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>
      </div>
      <div className="forgot-password">
        If you forget your password. Please contact your administrator for
        support.
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
