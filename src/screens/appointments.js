import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  List,
  Tooltip,
  Button,
  Modal,
  Input,
  Table,
  Form,
  Select,
  theme,
} from "antd";
const { Content } = Layout;
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function Appointments() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch("/api/addAppointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
        paddingTop: "3%",
        paddingLeft: "3%",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Appointments</Title>
          <Tooltip title="Add Appointment Log">
            <Button
              style={{ marginLeft: "1%", marginBottom: "1%" }}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Add Appointment Log"
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
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: true, message: "Please input your notes!" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Patient"
            name="patient"
            rules={[{ required: true, message: "Please select patient!" }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="John Doe">John Doe</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}
