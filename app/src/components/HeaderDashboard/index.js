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

import i18n from "language/i18n";
import { useTranslation } from "react-i18next";

const HeaderDashboard = () => {
  const { logout, isLogin, account } = useContext(AccountContext);
  const { t } = useTranslation();

  const handleMenuClick = (e) => {
    localStorage.setItem("language", e.key);
    i18n.changeLanguage(localStorage.getItem("language"));
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const langItems = [getItem(t("lang.vi"), "vi"), getItem(t("lang.en"), "en")];
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={4} style={{ color: "#18AEAC" }}>
        {t("header.title")}
      </Typography.Title>
      <Flex align="center" gap="3rem">
        <Flex align="center" gap="15px">
          <Dropdown
            overlay={
              <Menu mode="" onClick={handleMenuClick} items={langItems} />
            }
          >
            <div className="header__top__right_lang">
              <span>
                {localStorage.getItem("language") === "vi"
                  ? "Tiếng Việt"
                  : "English"}{" "}
              </span>
              <i class="fa fa-solid fa-caret-down"></i>
            </div>
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
