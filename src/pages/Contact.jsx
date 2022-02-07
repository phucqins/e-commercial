import React from "react";
import Helmet from "../components/Helmet";

const Contact = () => {
  return (
    <Helmet title="Liên hệ">
      <div className="contact">
        <p>
          Trang web này được tạo ra cho mục đích học tập, ngoài ra không phục vụ
          mục đích nào khác.
        </p>
        <h3>Mọi chi tiết vui lòng liên hệ: Nguyễn Quang Phúc.</h3>
        <h3>Email: phucnq26@gmail.com</h3>
      </div>
    </Helmet>
  );
};

export default Contact;
