import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import authApi from "api/auth";
import swal from "sweetalert2";

import {
  validateDoB,
  validateEmail,
  validateMinLength,
  validatePhone,
} from "utils/validator";

import "./style.css";
import { useContext } from "react";
import { Button, Checkbox } from "antd";
import { AccountContext } from "stores/AccountContext";

const SignUp = () => {
  const { login } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDoB] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();

  const validateFields = (
    password,
    passwordConfirm,
    email,
    phone,
    dob,
    acceptTerms
  ) => {
    if (password !== passwordConfirm) {
      swal.fire({
        title: "Error",
        text: "Mật khẩu xác nhận không khớp",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!validateEmail(email)) {
      swal.fire({
        title: "Error",
        text: "Nhập số điện thoại",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!validateMinLength(password, 6)) {
      swal.fire({
        title: "Error",
        text: "Mật khẩu phải từ 6 kí tự trở lên",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!validatePhone(phone)) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập số điện thoại hợp lệ",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!validateDoB(dob)) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập ngày sinh hợp lệ",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    console.log(acceptTerms);
    if (!acceptTerms) {
      swal.fire({
        title: "Error",
        text: "Vui lòng đọc và chấp nhận điều khoản",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    return true;
  };

  const onSubmit = async (e) => {
    try {
      console.log(dob);
      if (
        email &&
        password &&
        passwordConfirm &&
        fullname &&
        phone &&
        gender &&
        dob
      ) {
        if (
          !validateFields(
            password,
            passwordConfirm,
            email,
            phone,
            dob,
            acceptTerms
          )
        ) {
          return;
        }
        const entity = {
          email,
          password,
          fullname,
          phone,
          gender,
          dateOfBirth: dob,
        };

        setIsLoading(true);
        const response = await authApi.signup(entity);
        setIsLoading(false);

        const { exitcode, message } = response.data;

        if (exitcode === 0) {
          swal.fire({
            title: "Success",
            text: "Vui lòng kiểm tra email và xác nhận tài khoản",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigator("/login");
        } else {
          setError(message);
        }
      } else {
        swal.fire({
          text: "Vui lòng điền đầy đủ tất cả các trường",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      navigator("/error");
    }
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;

    const result = await authApi.googleLogin(credential);
    const { exitcode, token } = result.data;

    if (exitcode === 0) {
      login(token);
    } else {
      setError(result.data);
    }
  };

  const handleGoogleError = () => {
    setError("Đăng nhập thất bại");
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-4">
      {error && <p className="text-danger">{error}</p>}
      <form className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row">
        <h2 className="mb-4 color-key" style={{ fontWeight: "500" }}>
          Đăng ký
        </h2>

        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-lock"></i>
          <input
            name="password"
            type="password"
            autoComplete="on"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-lock"></i>
          <input
            name="passwordConfirm"
            type="password"
            autoComplete="on"
            placeholder="Nhập lại mật khẩu"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-user"></i>
          <input
            name="fullname"
            placeholder="Họ tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-phone"></i>
          <input
            name="phone"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-calendar"></i>
          <input
            type="date"
            name="birthdate"
            placeholder="Ngày sinh"
            value={dob}
            onChange={(e) => setDoB(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-1 ">
          <select
            className="custom-select"
            name="gender"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              appearance: "none",
            }}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="align-items-left mb-3 p-2" style={{ width: "100%" }}>
          <Checkbox
            value={acceptTerms}
            onChange={(event) => {
              setAcceptTerms(event.target.checked);
            }}
          >
            Tôi đã đồng ý với <Link to="/policy/terms">điều khoản sử dụng</Link>{" "}
            và <Link to="/policy/privacy">chính sách bảo mật</Link> của EatWell
          </Checkbox>
        </div>
        <Button
          className="primary-btn bg-key signup-btn col-6"
          type="primary"
          size="large"
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Đăng ký
        </Button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>Hoặc</p>
        <GoogleLoginButton
          onError={handleGoogleError}
          onSuccess={handleGoogleSuccess}
        />

        <p className="mt-3">
          Bạn đã có tài khoản?
          <Link to="/login" className="text-key pointer pl-1">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
