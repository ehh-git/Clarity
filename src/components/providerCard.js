import React, { useState, useEffect } from "react";
import { Avatar, Card, Button, theme } from "antd";
const { Meta } = Card;
import { EyeFilled } from "@ant-design/icons";

export default function ProviderCard({ name, img, description, providerId }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    const res = await fetch("/api/removeProvider", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setRemoved(true);
    }
    setLoading(false);
  };

  if (removed) {
    return null;
  }

  return (
    <Card style={{ width: 300 }}>
      <Meta
        avatar={<Avatar src={img} />}
        title={name}
        description={description}
      />
      <Button
        type="primary"
        danger
        loading={loading}
        onClick={handleRemove}
        style={{ marginTop: "5%" }}
      >
        Remove
      </Button>
    </Card>
  );
}
