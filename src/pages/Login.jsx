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
      url = `https://phucnq-yolo.herokuapp.com/api/v1/users/signup`;
      body = {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        passwordConfirm: confirmPasswordInputRef.current.value,
      };
    } else {
      url = `https://phucnq-yolo.herokuapp.com/api/v1/users/login`;
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
      showAlert("success", "????ng nh???p th??nh c??ng");
      setTimeout(() => {
        history.replace("/");
      }, 1500);
    }
    if (data.status === "fail") {
      setIsLoading((prevSate) => !prevSate);
      showAlert("error", "Sai t??n ????ng nh???p ho???c m???t kh???u");
    }
  };

  const createAccountSwitch = () => {
    setCreateAccount((prevSate) => {
      return !prevSate;
    });
  };

  return (
    <Helmet title={createAccount ? "????ng k??" : "????ng nh???p"}>
      <Section>
        <SectionTitle>{createAccount ? "????ng k??" : "????ng nh???p"}</SectionTitle>
        <SectionBody>
          <div className="login">
            <div className="login__form">
              <form className="form form--login" onSubmit={submitHandler}>
                {createAccount && (
                  <div className="login__form__group">
                    <label className="login__form__label" htmlFor="name">
                      T??n
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
                    M???t kh???u
                  </label>
                  <input
                    className="login__form__input"
                    id="password"
                    type="password"
                    placeholder="????????????????????????"
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
                      Nh???c l???i m???t kh???u
                    </label>
                    <input
                      className="login__form__input"
                      id="password-confirm"
                      minLength="8"
                      placeholder="????????????????????????"
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
                        {isLoading ? "??ang t???i..." : "????ng nh???p"}
                      </button>
                      <p
                        className="login__form__switch"
                        onClick={createAccountSwitch}
                      >
                        ho???c T???o t??i kho???n
                      </p>
                    </>
                  ) : (
                    <>
                      <button className="btn login__form__btn">
                        {isLoading ? "??ang t???i..." : "T???o t??i kho???n"}
                      </button>
                      <p
                        className="login__form__switch"
                        onClick={createAccountSwitch}
                      >
                        ???? c?? t??i kho???n? ????ng nh???p
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
