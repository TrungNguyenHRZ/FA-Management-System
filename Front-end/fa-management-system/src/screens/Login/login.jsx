import React, { useState, useEffect } from "react";
import "./login.css";
import { FaUserLarge, FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import apiUserInstance from "../../service/api-user";
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Nếu có token, điều hướng người dùng đến trang "overview"
      navigate("/overview");
    }
  }, []);
  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await apiUserInstance.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        Cookies.set("token", data.accessToken, { expires: 7 });
        apiUserInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        console.log(data.accessToken);
        if(data.accessToken){
          navigate("/overview");
          console.log("abc");
        }
      } else {
        setError("Invalid email or password. Try again !!!");
      }
    } catch (error) {
      console.error("Error", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      if(Cookies.get("token")){
        // navigate("/overview");
        // console.log("abc");
      }
    }
  };

  const handleInputChange = (e, inputType) => {
    const value = e.target.value;
    if (inputType === "email") {
      setEmail(value);
    } else if (inputType === "password") {
      setPassword(value);
    }
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
        </div>
      </div>
      <div className="error-message">{error && <>{error}</>}</div>

      <div className="forgot-password">
        If you forget your password. Please contact your administrator for
        support.
      </div>
      <div className="submit-container">
        <div
          className={`submit ${isLoading ? "loading" : ""}`}
          onClick={handleLogin}
        >
          {isLoading ? <ClipLoader color="#fff" size={18} /> : "Login"}
        </div>
      </div>
    </div>
  );
};

export default Login;
