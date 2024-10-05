import React from "react";

import { Box, IconButton, Stack, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy";

import AddTask from "@mui/icons-material/AddTask";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { AppContext } from "../AppContext";

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
  const { dispatch } = React.useContext(AppContext);

  const handleAddTodoClick = () => {
    console.log("Add a new todo");
    dispatch({ type: "SET_IS_ADDING_TODO", payload: true });
  };

  return (
    <Box
      id="right-nav-container"
      sx={{
        boxSizing: "border-box",
        width: "60px",
        height: "100%",
        display: "none",
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
          <IconButton variant="plain" onClick={handleAddTodoClick}>
            <AddTask sx={{ display: "block" }} />
          </IconButton>
          <Typography level="body-sm" sx={{ fontSize: "10px", mt: 0 }}>
            Add Todo
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
