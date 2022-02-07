import React from "react";

import { HashRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import ProductViewModal from "./ProductViewModal";
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
        <ProductViewModal />
      </div>
    </HashRouter>
  );
};

export default Layout;
