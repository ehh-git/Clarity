import { Html, Head, Main, NextScript } from "next/document";
import { ConfigProvider } from "antd";

export default function Document() {
  return (
    <Html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
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
