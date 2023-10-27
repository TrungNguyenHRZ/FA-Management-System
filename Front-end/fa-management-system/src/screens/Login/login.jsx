import React, { useState } from "react";
import "./login.css";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/user/login", {
  //       email,
  //       password,
  //     });

  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log(data);
  //       navigate("/");
  //     } else {
  //       setError("Invalid email or password.");
  //     }
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  const handleInputChange = (e, inputType) => {
    const value = e.target.value;
    if (inputType === "email") {
      setEmail(value);
    } else if (inputType === "password") {
      setPassword(value);
    }
  };

  // const handleSubmit = () => {
  //   console.log("User name: ", email);
  //   console.log("Password: ", password);
  // };

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
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
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
      <div className="error-message">{error && <>{error}</>}</div>

      <div className="forgot-password">
        If you forget your password. Please contact your administrator for
        support.
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
