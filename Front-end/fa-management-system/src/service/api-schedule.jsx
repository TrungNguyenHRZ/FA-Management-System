import axios from "axios";

const apiScheduleInstance = axios.create({
  baseURL: "http://localhost:8080/schedule",
});

export default apiScheduleInstance;
