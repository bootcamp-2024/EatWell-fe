import React, { useState, useEffect, useContext } from "react";
import { Avatar, Dropdown, Flex, Menu, Typography } from "antd";
import {
  DownOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import "./style.css";
import { AccountContext } from "stores/AccountContext";
import vnFlag from "images/vn-flag.png";
import ukFlag from "images/uk-flag.png";
import { Link } from "react-router-dom";
import defaultAvatar from "images/avatar.png";

const HeaderDashboard = () => {
  const { logout, isLogin, account } = useContext(AccountContext);
  const [language, setLanguage] = useState("Việt");

  const handleLanguageChange = (e) => {
    setLanguage(e.key);
  };

  const menu = (
    <Menu onClick={handleLanguageChange}>
      <Menu.Item key="vi">
        <img src={vnFlag} alt="Vietnam Flag" className="language-icon mr-1 " />
        Tiếng Việt
      </Menu.Item>
      <Menu.Item key="en">
        <img src={ukFlag} alt="UK Flag" className="language-icon mr-1 " />
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={4} style={{ color: "#18AEAC" }}>
        Chào mừng bạn trở lại!
      </Typography.Title>
      <Flex align="center" gap="3rem">
        <Flex align="center" gap="15px">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {language === "en" ? (
                <img
                  src={ukFlag}
                  alt="UK Flag"
                  className="language-icon mr-1 "
                />
              ) : (
                <img
                  src={vnFlag}
                  alt="Vietnam Flag"
                  className="language-icon mr-1 "
                />
              )}
              {language === "en" ? "English" : "Tiếng Việt"} <DownOutlined />
            </a>
          </Dropdown>
          <NotificationOutlined className="header-icon" />

          <Link to="/account/userInformation">
            <span className="account-info-name">{account.fullName}</span>
          </Link>
          <Avatar
            className="border rounded-circle"
            size={35}
            src={account.avatar_path || defaultAvatar}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderDashboard;
