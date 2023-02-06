import React from "react";

const Loading = ({ isFirstLoad }) => {
  return (
    <div className="center">
      {isFirstLoad ? (
        <p className="holder-text">
          Vì được deploy lên môi trường miễn phí nên lần đầu load hơi lâu, mong
          anh/chị thông cảm !
        </p>
      ) : (
        ""
      )}
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
