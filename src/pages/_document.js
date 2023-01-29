import { Html, Head, Main, NextScript } from "next/document";
import { ConfigProvider } from "antd";

export default function Document() {
  return (
    <Html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#ffffff",
            colorPrimaryBg: "#e7c8dd",
            colorPrimaryHover: "#e7c8dd",
            colorPrimaryBgHover: "#E2E4F6",
            colorPrimaryBorder: "#E7C8DD",
            colorPrimary: "#DBAFC1",
            colorPrimaryActive: "#E7C8DD",
          },
        }}
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </ConfigProvider>
    </Html>
  );
}
