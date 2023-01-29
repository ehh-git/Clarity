import React from "react";
import { Layout, Typography, Space, theme } from "antd";
const { Content } = Layout;
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import ProviderCard from "@/components/providerCard";
const { Title } = Typography;

export default function Providers() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const mockData = [
    {
      name: "John Doe",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: "Cardiovascular Surgeon",
    },
    {
      name: "Jane Doe",
      img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description: "General Practitioner",
    },
  ];

  const cards = mockData.map((data) => (
    <ProviderCard
      name={data.name}
      img={data.img}
      description={data.description}
    />
  ));

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
      <div
        style={{
          paddingLeft: "3%",
        }}
      >
        <Title>My Providers</Title>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {cards}
        </Space>
      </div>
    </Content>
  );
}
