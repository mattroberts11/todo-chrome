import React from "react";

import { Sheet } from "@mui/joy";

import RightNav from "./components/RightNav";
import MainPanel from "./components/MainPanel";

const Sidebar: React.FC = () => {
  return (
    <Sheet
      id="panel-wrapper"
      variant="outlined"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        flexGrow: 1,
        overflow: "hidden",
        border: "none",
      }}
    >
      <MainPanel />
      <RightNav />
    </Sheet>
  );
};

export default Sidebar;
