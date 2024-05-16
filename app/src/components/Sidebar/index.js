import logo from "images/logo.png";
import { Flex, Menu } from "antd";
import React, { useContext, useEffect } from "react";
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
import i18n from "language/i18n";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);
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
            label: t("navigation.suggestedMenu"),
          },
          {
            key: "2",
            icon: <LineChartOutlined />,
            label: t("navigation.analysis"),
          },
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: t("navigation.calendar"),
          },
          {
            key: "4",
            icon: <CameraOutlined />,
            label: t("navigation.recognition"),
          },
          {
            key: "5",
            icon: <SettingOutlined />,
            label: t("navigation.setting"),
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: t("navigation.logout"),
            onClick: handleLogout,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
