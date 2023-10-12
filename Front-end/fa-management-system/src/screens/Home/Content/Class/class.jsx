import React from "react";

import axios from "axios";


let serSearchResult;


await axios.get('http://localhost:8080/api/findAllClass')

  .then((res) => {
    serSearchResult = (res.data)
    console.log(serSearchResult);

  })


const Class = () => {
  return (
    <div className="class-container">
      <h1>Class</h1>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>code</td>
          </tr>
        </thead>
        <tbody>
          {serSearchResult.map((item, index) => (
            <tr key={index}>
              <td >{item.classID}</td>
              <td >{item.className}</td>
            </tr>
          ))}
        </tbody>


      </table>
    </div>
  );
};

export default Class;