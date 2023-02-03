import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Helmet from "../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import showAlert from "../utils/alert";
import { login } from "../redux/authentication/authenticationSlice";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const [createAccount, setCreateAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading((prevSate) => !prevSate);
    let url;
    let body;
    if (createAccount) {
      url = `https://yolo-backend.onrender.com/api/v1/users/signup`;
      body = {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        passwordConfirm: confirmPasswordInputRef.current.value,
      };
    } else {
      url = `https://yolo-backend.onrender.com/api/v1/users/login`;
      body = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };
    }

    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.status === "success") {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(
        login({
          user: data.data.user,
          token: data.token,
        })
      );
      setIsLoading((prevSate) => !prevSate);
      showAlert("success", "Đăng nhập thành công");
      setTimeout(() => {
        history.replace("/");
      }, 1500);
    }
    if (data.status === "fail") {
      setIsLoading((prevSate) => !prevSate);
      showAlert("error", "Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  const createAccountSwitch = () => {
    setCreateAccount((prevSate) => {
      return !prevSate;
    });
  };

  return (
    <Helmet title={createAccount ? "Đăng ký" : "Đăng nhập"}>
      <Section>
        <SectionTitle>{createAccount ? "Đăng ký" : "Đăng nhập"}</SectionTitle>
        <SectionBody>
          <div className="login">
            <div className="login__form">
              <form className="form form--login" onSubmit={submitHandler}>
                {createAccount && (
                  <div className="login__form__group">
                    <label className="login__form__label" htmlFor="name">
                      Tên
                    </label>
                    <input
                      className="login__form__input"
                      id="name"
                      name="name"
                      required="required"
                      type="text"
                      ref={nameInputRef}
                    />
                  </div>
                )}
                <div className="login__form__group">
                  <label className="login__form__label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="login__form__input"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required="required"
                    ref={emailInputRef}
                  />
                </div>
                <div className="login__form__group ma-bt-md">
                  <label className="login__form__label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    className="login__form__input"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minLength="8"
                    ref={passwordInputRef}
                  />
                </div>
                {createAccount && (
                  <div className="login__form__group ma-bt-lg">
                    <label
                      className="login__form__label"
                      htmlFor="password-confirm"
                    >
                      Nhắc lại mật khẩu
                    </label>
                    <input
                      className="login__form__input"
                      id="password-confirm"
                      minLength="8"
                      placeholder="••••••••"
                      required="required"
                      type="password"
                      ref={confirmPasswordInputRef}
                    />
                  </div>
                )}
                <div className="login__form__group center">
                  {!createAccount ? (
                    <>
                      <button className="btn login__form__btn">
                        {isLoading ? "Đang tải..." : "Đăng nhập"}
                      </button>
                      <p
                        className="login__form__switch"
                        onClick={createAccountSwitch}
                      >
                        hoặc Tạo tài khoản
                      </p>
                    </>
                  ) : (
                    <>
                      <button className="btn login__form__btn">
                        {isLoading ? "Đang tải..." : "Tạo tài khoản"}
                      </button>
                      <p
                        className="login__form__switch"
                        onClick={createAccountSwitch}
                      >
                        Đã có tài khoản? Đăng nhập
                      </p>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Login;
