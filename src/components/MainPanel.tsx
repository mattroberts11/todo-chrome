import React from "react";
import { Box } from "@mui/joy";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";

const MainPanel: React.FC = () => {
  return (
    <Box
      id="main-panel-container"
      sx={{
        boxSizing: "border-box",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        p: 1,
        position: "relative",
      }}
    >
      <Header />
      <MainContent />
      <Footer />
    </Box>
  );
};

export default MainPanel;
