import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Layout, Card, theme } from "antd";
// for patient page
const handleClick = (event) => {
  window.location.href = "/home";
};
// for doctor page
const handleClick2 = (event) => {
  window.location.href = "/doctor";
};
const { Content } = Layout;
export default function roleChoice() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#E7C8DD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Please Select Your Role"
        style={{
          width: 500,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          /* onFinish={onFinish}
      onFinishFailed={onFinishFailed} */
          autoComplete="off"
          style={{
            maxWidth: 600,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleClick}>
              Patient
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleClick2}>
              Provider
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
}
