import axios from "axios";
import React from "react";

const apiSyllabusInstance = axios.create({
  baseURL: "http://localhost:8080/syllabus",
});

export default apiSyllabusInstance;
