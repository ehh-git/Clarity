import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  List,
  Tooltip,
  Button,
  Modal,
  Input,
  theme,
} from "antd";
const { Content } = Layout;
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import ProviderCard from "@/components/providerCard";
const { Title } = Typography;

export default function Providers() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch("/api/addProvider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    setInput("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          <Title>My Providers</Title>
          <Tooltip title="Add Provider">
            <Button
              style={{ marginLeft: "1%", marginBottom: "1%" }}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <ProviderCard
                name={item.name}
                img={item.img}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Add Provider"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          size="large"
          placeholder="Provider Code"
          prefix={<UserOutlined />}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Modal>
    </Content>
  );
}
