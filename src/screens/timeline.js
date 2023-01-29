import React from "react";
import { Layout, Timeline, Typography, Card, Button, List, theme } from "antd";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

export default function TimelinePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const timelineEvents = [
    {
      id: "1",
      type: "appointment",
      title: "General Checkup",
      date: "2021-01-01",
      provider: "Dr. Smith",
      providerId: "123",
    },
    {
      id: "2",
      type: "symptom",
      title: "Headache",
      date: "2021-01-01",
    },
    {
      id: "3",
      type: "medication",
      title: "Tylenol",
      date: "2021-01-01",
    },
  ];

  const appointmentData = {
    id: "1",
    title: "General Checkup",
    date: "2021-01-01",
    provider: "Dr. Smith",
    providerId: "123",
    notes: "This is a note",
    prescriptions: [
      {
        id: "1",
        name: "Tylenol",
        dosage: "1 pill",
        frequency: "2x a day",
      },
      {
        id: "2",
        name: "Advil",
        dosage: "1 pill",
        frequency: "2x a day",
      },
      {
        id: "1",
        name: "Tylenol",
        dosage: "1 pill",
        frequency: "2x a day",
        description: "This is a note",
      },
      {
        id: "2",
        name: "Advil",
        dosage: "1 pill",
        frequency: "2x a day",
        description: "This is a note",
      },
    ],
  };

  const timelineItems = timelineEvents.map((event) => {
    let color = "";
    let data = "";

    switch (event.type) {
      case "appointment":
        color = "green";
        data = (
          <Card>
            <Text type="secondary">APPOINTMENT</Text>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <Button style={{ marginTop: "2%" }} type="primary">
              View Appointment Log
            </Button>
          </Card>
        );
        break;
      case "symptom":
        color = "blue";
        data = (
          <Card>
            <Text type="secondary">SYMPTOM</Text>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
          </Card>
        );
        break;
      case "medication":
        color = "purple";
        data = (
          <Card>
            <Text type="secondary">MEDICATION</Text>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
          </Card>
        );
        break;
      default:
        color = "red";
        data = (
          <Card>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
          </Card>
        );
        break;
    }

    return <Timeline.Item color={color}>{data}</Timeline.Item>;
  });

  return (
    <Content
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        background: colorBgContainer,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Content
        style={{
          width: "20vw",
          height: "100vh",
          minHeight: "100vh",
          minWidth: "20vw",
          marginLeft: "3%",
          background: colorBgContainer,
          paddingTop: "3%",
        }}
      >
        <Title>Timeline</Title>
        <Timeline>{timelineItems}</Timeline>
      </Content>
      <Content
        style={{
          width: "50vw",
          height: "100vh",
          minHeight: "100vh",
          minWidth: "50vw",
          marginLeft: "10%",
          paddingLeft: "3%",
          borderLeft: "1px solid #D3D3D3",
          background: colorBgContainer,
          display: "flex",
          flexDirection: "column",
          paddingTop: "3%",
        }}
      >
        <Title>{appointmentData.title}</Title>
        <Text type="secondary">{appointmentData.date}</Text>
        <Text type="secondary">{appointmentData.provider}</Text>
        <Text style={{ marginTop: "5%" }} type="secondary">
          {appointmentData.notes}
        </Text>
        <Title level={2} style={{ marginTop: "5%" }}>
          Prescriptions
        </Title>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={appointmentData.prescriptions}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>
                <p>{item.dosage}</p>
                <p>{item.frequency}</p>
                <p>{item.description}</p>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Content>
  );
}
