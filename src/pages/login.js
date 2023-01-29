import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Card,
  theme,
  Image,
} from "antd";
const handleClick = (event) => {
  window.location.href = "/rolechoice";
};
const { Content } = Layout;

export default function Login() {
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
        background: "#E2E4F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        width={500}
        src="https://cdn.discordapp.com/attachments/908611400421769246/1069285223809953892/Untitled_drawing.png"
        preview={false}
        style={{ marginBottom: "5%" }}
      />
      <Card
        title="Login"
        style={{
          width: 500,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          /* onFinish={onFinish}
      onFinishFailed={onFinishFailed} */
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleClick}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
}
