import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";

import "./style.css";

const Login = () => {
  return (
    <div className="d-flex container flex-column justify-content-center my-5">
      <form
        className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 color-key">Đăng nhập</h2>

        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i className="fa fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            // onChange={}
          />
        </div>
        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i className="fa fa-lock"></i>
          <input
            name="password"
            type="password"
            placeholder={t("loginPage.pass")}
            value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="primary-btn bg-key login-btn col-6" type="submit">
          Đăng nhập
        </button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>Hoặc</p>
        <GoogleLoginButton
        //   onError={handleGoogleError}
        //   onSuccess={handleGoogleSuccess}
        />
        <p className="mt-5">
          "Bạn chưa có tài khoản"
          <Link to="/signup" className="text-key pointer pl-1">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
