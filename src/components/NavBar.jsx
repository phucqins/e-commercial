import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { url } = useRouteMatch();

  const user = useSelector((state) => state.auth.user);

  const userLinks = [
    {
      id: 1,
      name: "Thông tin tài khoản",
      icon: "user-circle",
      to: "info",
      className: "user__navbar__list__child",
    },
    {
      id: 2,
      name: "Quản lý đơn hàng",
      icon: "receipt",
      to: "purchased",
      className: "user__navbar__list__child",
    },
    {
      id: 3,
      name: "Thông tin thanh toán",
      icon: "credit-card-front",
      to: "payment",
      className: "user__navbar__list__child",
    },
    {
      id: 4,
      name: "Sản phẩm yêu thích",
      icon: "heart",
      to: "favorite",
      className: "user__navbar__list__child",
    },
    {
      id: 5,
      name: "  Tin tức, khuyến mãi",
      icon: "news",
      to: "promotion",
      className: "user__navbar__list__child",
    },
  ];

  const adminLinks = [
    {
      id: 1,
      name: "Quản lý sản phẩm",
      icon: "store-alt",
      to: "products",
      className: "user__navbar__list__child",
    },
    {
      id: 2,
      name: "Quản lý khách hàng",
      icon: "user-check",
      to: "customers",
      className: "user__navbar__list__child",
    },
    {
      id: 3,
      name: "Thống kê",
      icon: "bar-chart",
      to: "statistic",
      className: "user__navbar__list__child",
    },
    {
      id: 4,
      name: "Thông tin tài khoản",
      icon: "user-circle",
      to: "info",
      className: "user__navbar__list__child",
    },
  ];

  const [activeLink, setActiveLink] = useState(1);

  const data = user.role === "user" ? userLinks : adminLinks;

  return (
    <div className="user__navbar">
      {user.role === "admin" && <h3 className="mb-3">Admin</h3>}
      <ul className="user__navbar__list">
        {data.map((link) => (
          <Link
            key={link.id}
            to={`${url}/${link.to}`}
            onClick={() => {
              setActiveLink(link.id);
            }}
            className={
              activeLink === link.id
                ? "user__navbar__list__child active"
                : "user__navbar__list__child"
            }
          >
            <i className={`bx bx-${link.icon}`}></i>
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
