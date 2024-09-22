import React from "react";

import { Box, Typography } from "@mui/joy";

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
    >
      <Typography component="h1">Main Content</Typography>
    </Box>
  );
};

export default MainContent;
