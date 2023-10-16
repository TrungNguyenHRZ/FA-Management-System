import React from "react";
import axios from "axios";

const apiClassInstance = axios.create({
  baseURL: "http://localhost:8080/syllabus",
});

export default apiClassInstance;
