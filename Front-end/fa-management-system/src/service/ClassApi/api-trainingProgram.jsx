import axios from "axios";
import React from "react";

const apiTrainingProgramInstance = axios.create({
  baseURL: "http://localhost:8080/TrainingProgram",
});

export default apiTrainingProgramInstance;
