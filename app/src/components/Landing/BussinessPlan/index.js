import React from "react";
import "./style.css";
import img from "images/top_landing.png";
import { Link } from "react-router-dom";

const BusinessPlan = () => {
  return (
    <div
      className="imageDescriptionContainer"
      style={{ height: "500px", marginTop: "20px" }}
    >
      <div className="imageContainer">
        <img
          src={img}
          alt="Description Image"
          style={{
            height: "100%",
            width: "100%", // Chiếm toàn bộ chiều rộng của container
            objectFit: "cover", // Đảm bảo hình ảnh không bị méo khi thu nhỏ hoặc phóng to
          }}
        />
      </div>
      <div className="descriptionContainer">
        <h3 style={{ fontWeight: 700, color: "#18AEAC", marginBottom: "30px" }}>
          Đánh giá của khách hàng
        </h3>
        <p>
          Chia sẻ trải nghiệm của bạn cho mọi người.
        </p>
        <Link
          to="/*"
          className="primary-btn"
          style={{ borderRadius: "5px", marginRight: "10px" }}
        >
          Tìm hiểu thêm
        </Link>
      </div>
    </div>
  );
};

export default BusinessPlan;
