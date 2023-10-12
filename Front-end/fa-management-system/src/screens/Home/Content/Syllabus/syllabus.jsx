import React, { Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SearchSyllabus from "./searchSyllabus";
let serSearchResult = null;
let flag = true;
// let on = true;
// let keyword = "";

// const tmp1 = (e) => {
//   on = false;
// };

// const tmp2 = (e) => {
//   keyword = e.target.value;
// };

// if (keyword === "" && on === true) {
//   await axios.get("http://localhost:8080/syllabus/view").then((res) => {
//     serSearchResult = res.data;
//     console.log(serSearchResult);
//   });
// } else if (on === false && keyword != "") {

if (flag) {
  await axios.get("http://localhost:8080/syllabus/view").then((res) => {
    serSearchResult = res.data;
    console.log(serSearchResult);
  });
}
const searchSyllabus = async (id) => {
  await axios.get("http://localhost:8080/syllabus/view/" + id).then((res) => {
    serSearchResult = res.data;
    console.log(serSearchResult);
  });
  console.log(id);
  flag = false;
  <SearchSyllabus
    todoProps={serSearchResult}
    searchSyllabusFunction={searchSyllabus}
  />;
};

const Syllabus = () => {
  return (
    <Fragment>
      <SearchSyllabus
        todoProps={serSearchResult}
        searchSyllabusFunction={searchSyllabus}
      />
    </Fragment>
  );
};

export default Syllabus;
