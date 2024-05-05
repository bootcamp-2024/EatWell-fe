import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <>
      <footer className="footer spad border custom-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <div className="footer__about__logo">
                  <a href="/" style={{ width: "100%" }}>
                    <img src={logo} alt="logo" />
                  </a>
                </div>
                <ul>
                  <li>Address: 227 Nguyen Van Cu, HCMC</li>
                  <li>Phone Number: (028) 1 2345 678</li>
                  <li>Email: corpeatwell@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div className="footer__widget">
                <h6>Reference</h6>
                <ul>
                  <li>
                    <Link to="/policy/warranty">Warranty policy</Link>
                  </li>
                  <li>
                    <Link to="/policy/terms"> Terms & conditions</Link>
                  </li>
                  <li>
                    <Link to="/policy/information">Company Infomation</Link>
                  </li>
                  <li>
                    <Link to="/policy/aboutUs">About Us</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link to="/policy/disclaimer">Disclaimer</Link>
                  </li>
                  <li>
                    <Link to="/policy/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/policy/aboutUs">Careers</Link>
                  </li>
                  <li>
                    <Link to="/policy/aboutUs">Help Centre</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="footer__widget">
                <h6>Contacts</h6>
                <div className="footer__widget__social">
                  <a href="https://www.facebook.com">
                    <i className="fa fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright">
                <div className="footer__copyright__text">
                  <p>Copyright &copy;2024 All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
