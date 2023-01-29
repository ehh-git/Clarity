import React, { useState } from "react";
import { Typography, theme } from "antd";
const { Title } = Typography;

export default function Index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <Title>Clarity</Title>;
}
