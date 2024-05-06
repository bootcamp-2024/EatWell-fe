import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./style.css";
import logo from "images/logo.png";
import { useContext } from "react";
import { AccountContext } from "stores/AccountContext";

const Header = () => {
  const { logout, isLogin, account } = useContext(AccountContext);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <header
        className="header border pb-1"
        style={{ marginBottom: "25px", marginTop: "10px" }}
      >
        <div className="container">
          <div className="row container" style={{ paddingRight: "0px" }}>
            <div className="col-lg-3" style={{ paddingLeft: "0px" }}>
              <div className="header__logo logo" style={{ width: "500px" }}>
                <Link to="/">
                  <img src={logo} style={{ width: "100%" }} alt="eatwell" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className={pathname === "/" ? "active" : ""}>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className={pathname === "/about-us" ? "active" : ""}>
                    <Link to="/about-us">Về chúng tôi</Link>
                  </li>
                  <li
                    className={pathname.startsWith("/policy") ? "active" : ""}
                  >
                    <Link to="/policy/privacy">Chính sách</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="/policy/privacy">Privacy</Link>
                      </li>
                      <li>
                        <Link to="/policy/warranty">Warranty</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            {isLogin && (
              <div
                className="col-lg-3 right-corner-header"
                style={{ paddingRight: "0px" }}
              ></div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
