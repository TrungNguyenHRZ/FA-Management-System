import axios from "axios";
import React from "react";

const apiClassInstance = axios.create({
  baseURL: "http://localhost:8080/class",
});

export default apiClassInstance;
