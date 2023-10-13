import axios from "axios";

export function getListClass() {
  let tmp;
  axios.get("http://localhost:8080/class/all").then((res) => {
    tmp = res.data.payload;
  });

  return tmp;
}
