import React, { useState, useEffect, useContext } from "react";
import { Avatar, Flex, Typography } from "antd";
import { MessageOutlined, NotificationOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import "./style.css";
import { AccountContext } from "stores/AccountContext";

const HeaderDashboard = () => {
  const { logout, isLogin, account } = useContext(AccountContext);

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={3} type="secondary">
        Welcome back, <span className="ml-2">{account.fullName}</span>
      </Typography.Title>
      <Flex align="center" gap="3rem">
        <Flex align="center" gap="10px">
          <MessageOutlined className="header-icon" />
          <NotificationOutlined className="header-icon" />
          <Avatar icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderDashboard;
