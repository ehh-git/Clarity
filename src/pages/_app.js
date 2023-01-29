import "@/styles/globals.css";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#ffffff",
          colorPrimaryBg: "e7c8dd",
          colorPrimaryHover: "#e7c8dd",
          colorPrimaryBgHover: "#E2E4F6",
          colorPrimaryBorder: "#E7C8DD",
          colorPrimary: "#DBAFC1",
          colorPrimaryActive: "#E7C8DD",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
