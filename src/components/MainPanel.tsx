import React from "react";
import { Box } from "@mui/joy";
import Header from "./Header";

const MainPanel: React.FC = () => {
  return (
    <Box
      id="main-panel-container"
      sx={{
        boxSizing: "border-box",
        width: "calc(100% - 60px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        p: 1,
        position: "relative",
      }}
    >
      <Header />
    </Box>
  );
};

export default MainPanel;
