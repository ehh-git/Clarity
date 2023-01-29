import React, { useState } from "react";
import { Layout, Menu, Image, Button, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { PaperClipOutlined } from "@ant-design/icons";
import Providers from "../screens/providers";
import Timeline from "../screens/timeline";
import Usersettings from "../screens/usersettings";
import MedicationsPage from "@/screens/medications";
import Appointments from "@/screens/appointments";

export default function Doctor() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let page = "";

  const [currPage, setCurrPage] = useState("1");
  switch (currPage) {
    case "1":
      page = <Appointments />;
      break;
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
          backgroundColor: "#fff",
        }}
      >
        <Image
          src="https://cdn.discordapp.com/attachments/908611400421769246/1069285223809953892/Untitled_drawing.png"
          preview={false}
          style={{ marginBottom: "5%", padding: "15%" }}
        />
        <Menu
          theme="light"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <PaperClipOutlined />,
              label: "Appointments",
            },
          ]}
          onClick={(e) => {
            setCurrPage(e.key);
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Button
            danger
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Sign Out
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {page}
      </Layout>
    </Layout>
  );
}
