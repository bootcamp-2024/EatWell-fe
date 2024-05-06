import React from "react";
import { Link } from "react-router-dom";
import banner from "images/banner.jpg";

const Banner = () => {
  return (
    <>
      <div
        className="hero__item set-bg"
        style={{
          backgroundImage: `url(${banner})`,
          height: "500px",
          backgroundSize: "cover", // Đảm bảo hình ảnh luôn che kín phần nền
          backgroundPosition: "center", // Đảm bảo hình ảnh luôn căn giữa
          position: "relative", // Đặt vị trí tương đối cho phần tử cha
        }}
      >
        <div
          className="hero__text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 1000, color: "#EF700D" }}>
            Đồng hành cùng bạn trong mọi bữa ăn
          </span>
          <h2 style={{ color: "#F2E217" }}>
            Đa dạng công thức Châu Á<br />
            Xếp lịch nhanh chóng
          </h2>
          <Link
            to="/signup"
            className="primary-btn"
            style={{ borderRadius: "5px", marginRight: "10px" }}
          >
            Đăng ký ngay
          </Link>

          <Link
            to="/about-us"
            className="primary-btn"
            style={{
              borderRadius: "5px",
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            Về chúng tôi
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
