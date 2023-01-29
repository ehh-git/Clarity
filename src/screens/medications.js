import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Tag, Space, theme } from "antd";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

export default function MedicationsPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    {
      title: "Medication",
      dataIndex: "medication",
      key: "medication",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dodage",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Side Effects",
      key: "sideEffects",
      dataIndex: "sideEffects",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetch("/api/medications")
      .then((res) => res.json())
      .then((data) => {
        setMedications(data);
      });
  }, []);

  return (
    <Content
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        background: colorBgContainer,
        backgroundColor: "#E2E4F6",
        paddingTop: "3%",
        paddingLeft: "3%",
      }}
    >
      <Title>Medications</Title>
      <Table columns={columns} dataSource={medications} />
    </Content>
  );
}