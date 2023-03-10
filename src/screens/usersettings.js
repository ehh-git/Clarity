import React from "react";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

export default function Providers() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        background: colorBgContainer,
      }}
    >
      <p1 style={{ color: "black" }}>Providers page</p1>
    </Content>
  );
}
