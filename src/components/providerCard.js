import React from "react";
import { Avatar, Card, Button, theme } from "antd";
const { Meta } = Card;
import { EyeFilled } from "@ant-design/icons";

export default function ProviderCard({ name, img, description }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Card style={{ width: 300 }}>
      <Meta
        avatar={<Avatar src={img} />}
        title={name}
        description={description}
      />
      <Button type="primary" danger style={{ marginTop: "5%" }}>
        Remove
      </Button>
    </Card>
  );
}
