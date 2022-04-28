import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";

import Helmet from "../components/Helmet";
import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import UserPasswordChange from "../components/UserPasswordChange";
import ProductManagement from "../components/ProductManagement";

const UserProfile = () => {
  const { path } = useRouteMatch();

  const user = useSelector((state) => state.auth.user);
  return (
    <Helmet title={user.name.split(" ")[0]}>
      <div className="user">
        <NavBar />
        <Route path={`${path}/info`}>
          <UserInfo />
          <UserPasswordChange />
        </Route>
        <Route exact path={`${path}/products`}>
          <ProductManagement />
        </Route>
      </div>
    </Helmet>
  );
};

export default UserProfile;
