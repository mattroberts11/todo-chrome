import React from "react";

import { Box, Typography } from "@mui/joy";
import List from "./List";

const MainContent: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        p: 1,
      }}
      id="main-content"
      role="main"
    >
      <Typography component="h3" aria-label="All Tasks Heading">
        All Tasks
      </Typography>
      <List />
    </Box>
  );
};

export default MainContent;
