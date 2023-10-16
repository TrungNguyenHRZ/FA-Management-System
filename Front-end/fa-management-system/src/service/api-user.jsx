import axios from "axios";
import React from "react";

const apiUserInstance = axios.create({
  baseURL: "http://localhost:8080/user",
});

export default apiUserInstance;
