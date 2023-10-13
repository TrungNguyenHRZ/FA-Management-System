import axios from "axios";

export function getListSyllabus() {
  let tmp;
  axios.get("http://localhost:8080/syllabus/view").then((res) => {
    tmp = res.data.payload;
  });

  return tmp;
}
