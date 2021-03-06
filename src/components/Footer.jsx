import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";
import logo from "../assets/images/Logo-2.png";

const footerAboutLinks = [
  {
    display: "Giới thiệu",
    path: "/contact",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
  {
    display: "Tuyển dụng",
    path: "/contact",
  },
  {
    display: "Tin Tức",
    path: "/contact",
  },
  {
    display: "Hệ thống cửa hàng",
    path: "/contact",
  },
];

const footerCustomerLinks = [
  {
    display: "Chính sách đổi trả",
    path: "/contact",
  },
  {
    display: "Chính sách bảo hành",
    path: "/contact",
  },
  {
    display: "Chính sách hoàn tiền",
    path: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Tổng đài hỗ trợ</div>
            <div className="footer__content">
              <p>
                Liên hệ đặt hàng <strong>0818890057</strong>
              </p>
              <p>
                Thắc mắc đơn hàng <strong>0818890057</strong>
              </p>
              <p>
                Góp ý, khiếu nại <strong>0818890057</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">Về Yolo</div>
            <div className="footer__content">
              {footerAboutLinks.map((e, i) => (
                <p key={i}>
                  <Link to={e.path}>{e.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Chăm sóc khách hàng</div>
            <div className="footer__content">
              {footerCustomerLinks.map((e, i) => (
                <p key={i}>
                  <Link to={e.path}>{e.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" alt="" />
              </Link>
            </p>
            <p>
              Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng
              triệu người tiêu dùng Việt. Hãy cùng Yolo hướng đến mục tiêu một
              cuộc sống năng động, tích cực hơn.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
