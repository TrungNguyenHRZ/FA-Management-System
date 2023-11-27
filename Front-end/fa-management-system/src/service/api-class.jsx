import axios from "axios";

const apiClassInstance = axios.create({
  baseURL: "http://localhost:8080/class",
});

export default apiClassInstance;
