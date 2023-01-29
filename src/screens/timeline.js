import React, { useState, useEffect } from "react";
import {
  Layout,
  Timeline,
  Typography,
  Card,
  Button,
  List,
  Form,
  Modal,
  Select,
  Input,
  Tooltip,
  theme,
} from "antd";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
import { PlusOutlined } from "@ant-design/icons";

export default function TimelinePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [timelineEvents, setTimelineEvents] = useState([]);
  const [appointmentData, setAppointmentData] = useState(undefined);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setTimelineEvents(data);
      });
  }, []);

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch("/api/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((res) => res.json())
      .then((data) => {
        setTimelineEvents(data);
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            <Button
              style={{ marginTop: "2%" }}
              type="primary"
              onClick={() => {
                setAppointmentData(event);
              }}
            >
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
        overflowY: "auto",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Timeline</Title>
          <Tooltip title="Add Event">
            <Button
              style={{ marginLeft: "1%", marginBottom: "1%" }}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
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
        {appointmentData ? (
          <>
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
          </>
        ) : (
          <h2 style={{ color: "black" }}>Select an appointment on the left</h2>
        )}
      </Content>
      <Modal
        title="Add Event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          /* onFinish={onFinish}
      onFinishFailed={onFinishFailed} */
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type!" }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="symptom">Symptom</Option>
              <Option value="medication">Medication</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
