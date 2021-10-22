import React from "react";

import { HashRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Routes from "../routes/Routes";

const Layout = () => {
  return (
    <HashRouter>
      <div>
        <Header />
        <div className="container">
          <div className="main">
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default Layout;
