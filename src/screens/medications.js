import React from "react";
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

  const data = [
    {
      key: "1",
      medication: "Tylenol",
      dosage: "1 pill",
      frequency: "2x a day",
      sideEffects: ["headache", "nausea"],
    },
    {
      key: "2",
      medication: "Advil",
      dosage: "1 pill",
      frequency: "2x a day",
      sideEffects: ["headache", "nausea"],
    },
  ];

  return (
    <Content
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        background: colorBgContainer,
        paddingTop: "3%",
        paddingLeft: "3%",
      }}
    >
      <Title>Medications</Title>
      <Table columns={columns} dataSource={data} />
    </Content>
  );
}
