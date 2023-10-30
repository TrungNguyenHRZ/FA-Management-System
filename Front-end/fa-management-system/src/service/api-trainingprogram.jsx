import axios from "axios";

const apiTrainingProgramInstance = axios.create({
  baseURL: "http://localhost:8080/TrainingProgram",
});

export default apiTrainingProgramInstance;
