import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import Accessories from "../pages/Accessories";
import Contact from "../pages/Contact";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Products} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/accessories" component={Accessories} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
};

export default Routes;
