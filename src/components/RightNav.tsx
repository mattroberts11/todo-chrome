import React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy";

import AddTask from "@mui/icons-material/AddTask";
// import ListIcon from "@mui/icons-material/List";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const ButtonWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

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
        pt: "104px",
        pb: 4,
        maxWidth: "60px",
        alignItems: "center",
        borderLeft: `1px solid ${theme.palette.divider}`,
        flexGrow: 1,
      }}
    >
      <Stack
        id="button-wrapper"
        direction={"column"}
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <ButtonWrapper>
          <IconButton variant="plain">
            <AddTask sx={{ display: "block" }} />
          </IconButton>
          <Typography level="body-sm" sx={{ fontSize: "10px", mt: 0 }}>
            Add Task
          </Typography>
        </ButtonWrapper>
        <ButtonWrapper>
          <IconButton variant="plain">
            <PlaylistAddIcon />
          </IconButton>
          <Typography level="body-sm" sx={{ fontSize: "10px", mt: 0 }}>
            Add List
          </Typography>
        </ButtonWrapper>
      </Stack>
    </Box>
  );
};

export default RightNav;
