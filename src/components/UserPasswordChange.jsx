import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import updateUser from "../utils/updateUser";
import { login } from "../redux/authentication/authenticationSlice";

const UserPasswordChange = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        passwordCurrent: currentPasswordInputRef.current.value,
        password: newPasswordInputRef.current.value,
        passwordConfirm: confirmPasswordInputRef.current.value,
      };

      const data = await updateUser(updateData, "password", token);
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(
        login({
          user: data.data.user,
          token: data.token,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user__form">
      <h3 className="user__form__heading">Thay mật khẩu</h3>
      <form
        className="form form-user-password"
        onSubmit={passwordChangeHandler}
      >
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Mật khẩu cũ
          </label>
          <input
            className="form__input"
            id="password-current"
            minLength="8"
            placeholder="••••••••"
            required="required"
            type="password"
            ref={currentPasswordInputRef}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Mật khẩu mới
          </label>
          <input
            className="form__input"
            id="password"
            minLength="8"
            placeholder="••••••••"
            required="required"
            type="password"
            ref={newPasswordInputRef}
          />
        </div>
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Nhập lại mật khẩu mới
          </label>
          <input
            className="form__input"
            id="password-confirm"
            minLength="8"
            placeholder="••••••••"
            required="required"
            type="password"
            ref={confirmPasswordInputRef}
          />
        </div>
        <div className="form__group right">
          <button className="btn form__btn">Thay đổi</button>
        </div>
      </form>
    </div>
  );
};

export default UserPasswordChange;
