import React, { useRef } from "react";
import updateUser from "../utils/updateUser";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/authentication/authenticationSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const infoChangeHandler = async (e) => {
    e.preventDefault();

    const updateData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
    };
    const data = await updateUser(updateData, "data", token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    dispatch(
      setUser({
        user: data.data.user,
      })
    );
  };

  return (
    <div className="user__form">
      <h3 className="user__form__heading">Thông tin tài khoản</h3>
      <form className="form form-user-data" onSubmit={infoChangeHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Họ & Tên
          </label>
          <input
            className="form__input"
            id="name"
            name="name"
            required="required"
            type="text"
            defaultValue={user.name}
            ref={nameInputRef}
          />
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Địa chỉ Email
          </label>
          <input
            className="form__input"
            id="email"
            name="email"
            required="required"
            type="email"
            defaultValue={user.email}
            ref={emailInputRef}
          />
        </div>

        <div className="form__group right">
          <button className="btn form__btn">Lưu thay đổi</button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
