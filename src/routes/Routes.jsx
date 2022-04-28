import React from "react";

import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Products from "../pages/Products";
import Accessories from "../pages/Accessories";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import UserProfile from "../pages/UserProfile";

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:id" component={Products} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/accessories" component={Accessories} />
      <Route path="/contact" component={Contact} />
      {isLoggedIn && <Route path="/user" component={UserProfile} />}
      {!isLoggedIn && <Route path="/login" component={Login} />}
    </Switch>
  );
};

export default Routes;
