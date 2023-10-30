import axios from "axios";

const apiSyllabusInstance = axios.create({
  baseURL: "http://localhost:8080/syllabus",
});

export default apiSyllabusInstance;
