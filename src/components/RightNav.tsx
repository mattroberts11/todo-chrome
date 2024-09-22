import React from "react";

import { Box, IconButton } from "@mui/joy";
import { useTheme } from "@mui/joy";

import AddTask from "@mui/icons-material/AddTask";

const RightNav: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id="right-nav-container"
      sx={{
        boxSizing: "border-box",
        width: "60px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        pt: "64px",
        pb: 4,
        maxWidth: "60px",
        alignItems: "center",
        borderLeft: `1px solid ${theme.palette.divider}`,
        flexGrow: 1,
      }}
    >
      <Box
        id="button-wrapper"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <IconButton variant="plain">
          <AddTask />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RightNav;
