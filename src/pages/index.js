import React, { useState } from "react";
import { Typography, theme } from "antd";
// import { ConfigProvider } from 'antd';
const { Title } = Typography;

// const theme = {
//   "token": {
//     "colorPrimary": "#dbafc1"
//   }
// };
// function App() {
//   return (
//     <ConfigProvider theme={theme}>
//       <YourAppContent />
//     </ConfigProvider>
//   );
// }
// export default App;

export default function Index() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <Title>Clarity</Title>;
}
