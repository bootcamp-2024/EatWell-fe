import logo from "images/logo.png";
import { Flex, Menu } from "antd";
import React, { useContext } from "react";
import {
  CalendarOutlined,
  CameraOutlined,
  LineChartOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./style.css";
import { AccountContext } from "stores/AccountContext";
import { Router, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AccountContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };
  const currentPath = Router.pathname;

  const handleMenuClick = (key) => {
    switch (key) {
      case "1":
        navigate("/meal/proposed-menu");
        break;
      case "2":
        navigate("/meal/analysis");
        break;
      case "3":
        navigate("/meal/calendar");
        break;
      case "4":
        navigate("/meal/omr");
        break;
      case "5":
        navigate("/meal/settings/userInformation");
        break;
      case "6":
        handleLogout();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          {" "}
          <img src={logo} alt="Your Logo" />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          {
            key: "1",
            icon: <ScheduleOutlined />,
            label: "Đề xuất thực đơn",
          },
          {
            key: "2",
            icon: <LineChartOutlined />,
            label: "Phân tích",
          },
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: "Xem lịch ăn uống",
          },
          {
            key: "4",
            icon: <CameraOutlined />,
            label: "Nhận diện ",
          },
          {
            key: "5",
            icon: <SettingOutlined />,
            label: "Cài đặt ",
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: "Đăng xuất ",
            onClick: handleLogout,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
