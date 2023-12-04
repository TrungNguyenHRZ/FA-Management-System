import React from "react";
import "./error-page.css";
import Header from "./../Home/Dashboard/Header/header";
import Footer from "./../Home/Dashboard/Footer/footer";
const ErrorPage = () => {
  return (
    <div>
      <Header />
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! This Page Could Not Be Found</h2>
          <p>
            Sorry but the page you are looking for does not exist, have been
            removed. name changed or is temporarily unavailable
          </p>
          <a href="/overview">Go To Homepage</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
