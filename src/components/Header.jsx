import { React, useRef, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/authentication/authenticationSlice";
import { removeAll } from "../redux/shopping-cart/cartItemsSlice";
import logo from "../assets/images/Logo-2.png";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const cartItems = useSelector((state) => state.cartItems.value);

  let items = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const logoutHandler = () => {
    if (pathname.includes("user")) history.replace("/");
    dispatch(logout());
    dispatch(removeAll());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        (document.body.scrollTop > 80 && headerRef) ||
        (document.documentElement.scrollTop > 80 && headerRef)
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", {});
    };
  }, []);

  const menuLeft = useRef(null);
  const menuToggle = () => {
    menuLeft.current.classList.toggle("active");
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>

            {mainNav.map((e, i) => (
              <div
                onClick={menuToggle}
                key={i}
                className={`header__menu__item header__menu__left__item ${
                  i === activeNav ? "active" : ""
                }`}
              >
                <Link to={e.path}>
                  <span>{e.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <div className="header__menu__item__badge">
                {items === 0 ? "" : items}
              </div>

              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item hover">
              {isLoggedIn && (
                <>
                  <i className="bx bx-user"></i>
                  <ul className="hover__menu">
                    <li>
                      <Link
                        to={
                          user.role === "user" ? "/user/info" : "/user/products"
                        }
                      >
                        <i className="bx bx-user"></i>
                        Tài khoản
                      </Link>
                    </li>
                    <li onClick={logoutHandler}>
                      <i className="bx bx-log-out"></i>
                      Đăng xuất
                    </li>
                  </ul>
                </>
              )}
              {!isLoggedIn && (
                <Link to="/login">
                  <i className="bx bx-user"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
