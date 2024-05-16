import { Menu } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountBar = () => {
  let navigate = useNavigate();

  const items = [
    { key: "userInformation", label: "Xem thông tin người dùng" },
    { key: "changeInformation", label: "Đổi thông tin người dùng" },
    { key: "healthSettings", label: "Quản lý chỉ số sức khỏe" },
  ];

  const onClick = (e) => {
    navigate({
      pathname: `/meal/settings/${e.key}`,
    });
  };

  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>Tùy chỉnh</span>
        </div>

        <Menu
          onClick={onClick}
          defaultSelectedKeys={["userInformation"]}
          style={{ border: "1px solid #e8e8e8" }}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};

export default AccountBar;
