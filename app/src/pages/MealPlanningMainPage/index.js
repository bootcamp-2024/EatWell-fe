import React, { useState } from "react";
import "./style.css";
import { Button, Layout } from "antd";
import Sidebar from "components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderDashboard from "components/HeaderDashboard";
import Analysis from "components/Analysis";
const { Sider, Header, Content } = Layout;

const MealPlanningMainPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <Sidebar />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="triger-btn"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <HeaderDashboard />
        </Header>
        <Content className="content">
          <Analysis />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MealPlanningMainPage;
