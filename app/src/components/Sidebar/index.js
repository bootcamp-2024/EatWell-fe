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

const Sidebar = () => {
  const { logout } = useContext(AccountContext);
  const handleLogout = () => {
    logout();
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
