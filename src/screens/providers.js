import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  List,
  Tooltip,
  Button,
  Form,
  Modal,
  Input,
  Row,
  ConfigProvider,
  Radio,
  Checkbox,
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
    let n = "";
    let image = "";
    let desc = "";
    if (input === "123") {
      n = "Vin Diesel";
      image =
        "https://cdn.cnn.com/cnnnext/dam/assets/200927125801-vin-diesel-file-super-tease.jpg";
      desc = "Cardiovascular Surgeon";
    }
    else if (input === "321") {
      n = "Dwayne the Rock Johnson";
      image = "https://i.kym-cdn.com/entries/icons/facebook/000/038/638/the_wock.jpg";
      desc = "General Practitioner";
    }
    else {
      n = "John Cina";
      image = "https://ntvb.tmsimg.com/assets/assets/487578_v9_bb.jpg?w=270&h=360";
      desc = "Pediatrician";
    }
    fetch("/api/addProvider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        providerId: input,
        name: n,
        img: image,
        description: desc,
      }),
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
        backgroundColor: "#E2E4F6",
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
        <Row
          style={{
            marginRight: "20%",
          }}
        >
          {data.map((item) => (
            <List.Item style={{ padding: "1%" }}>
              <ProviderCard
                name={item.name}
                img={item.img}
                description={item.description}
              />
            </List.Item>
          ))}
        </Row>
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
