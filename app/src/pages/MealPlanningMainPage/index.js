import React, { useState } from "react";
import "./style.css";
import { Button, Layout, Switch } from "antd";
import Sidebar from "components/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderDashboard from "components/HeaderDashboard";
import Analysis from "components/Analysis";
import { Route, Routes } from "react-router-dom";
import AccountPage from "pages/AccountPage";
import Calendar from "components/Calendar";
import MenuList from "components/MenuList";
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
          <Routes>
            <Route path="/analysis" element={<Analysis />} />
            {/* <Route exact path="/menus" element={<MenuList />} /> */}
            <Route exact path="/calendar" element={<MenuList />} />
            <Route path="/settings/*" element={<AccountPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MealPlanningMainPage;
