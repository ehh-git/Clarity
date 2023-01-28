import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import Providers from "./screens/providers";

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let page = "";

  const [currPage, setCurrPage] = useState("1");
  switch (currPage) {
    case "1":
      page = <Providers />;
      break;
    case "2":
      page = <h1>bruh</h1>;
      break;
    default:
      page = <Providers />;
  }
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: colorBgContainer,
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "My Providers",
            },
            {
              key: "2",
              icon: <CalendarOutlined />,
              label: "Calendar",
            },
          ]}
          onClick={(e) => {
            setCurrPage(e.key);
          }}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {page}
      </Layout>
    </Layout>
  );
}
