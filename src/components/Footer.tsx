import React, { useContext } from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/joy";
import { useTheme } from "@mui/joy";

import { AppContext } from "../AppContext";
import AddIcon from "@mui/icons-material/Add";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import TodayIcon from "@mui/icons-material/Today";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type ButtonWrapperProps = {
  children: React.ReactNode;
  sx?: object;
};

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children, sx = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const Footer: React.FC = () => {
  const theme = useTheme();
  const appContext = useContext(AppContext);
  const { dispatch } = appContext;

  const handleAddTodoClick = () => {
    dispatch({ type: "SET_IS_ADDING_TODO", payload: true });
  };

  const clearAllStorage = () => {
    chrome.storage.sync.clear(() => {
      if (chrome.runtime.lastError) {
        console.error("Error clearing storage:", chrome.runtime.lastError);
      } else {
        alert("All storage has been cleared");
        // Update your app state here
        dispatch({ type: "SET_TODO_STORAGE", payload: [] });
      }
    });
  };

  return (
    <Box
      component={"footer"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        p: 0,
        bottom: 0,
        position: "sticky",
      }}
      role="contentinfo"
    >
      <Box
        sx={{
          backgroundColor: `${theme.palette.background.level2}`,
          borderRadius: "16px",
          width: "100%",
          display: "flex",
          padding: "12px",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack direction="row" width="100%" justifyContent="space-around">
          <ButtonWrapper>
            <IconButton
              variant="plain"
              aria-label="Go to Home"
              sx={{ display: "none" }}
            >
              <HomeIcon sx={{ display: "block" }} />
            </IconButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <IconButton variant="plain" sx={{ display: "none" }}>
              <TodayIcon
                sx={{ display: "block" }}
                aria-label="View Today's Tasks"
              />
            </IconButton>
          </ButtonWrapper>
          <Box
            id="mid-spacer"
            sx={{ width: "40px", marginLeft: "10%", position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-25%",
                left: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(-50%, -50%)",
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                backgroundColor: `${theme.palette.divider}`,
              }}
            >
              <IconButton
                variant="solid"
                color="primary"
                sx={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                }}
                aria-label="Add a new task"
                onClick={handleAddTodoClick}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <ButtonWrapper>
            <IconButton
              sx={{ display: "none" }}
              variant="plain"
              aria-label="Application settings"
            >
              <SettingsIcon />
            </IconButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <Tooltip
              color="danger"
              variant="solid"
              size="sm"
              title="This will delete All tasks forever!"
              placement="top"
              arrow
            >
              <IconButton
                variant="plain"
                aria-label="Delete all tasks"
                onClick={clearAllStorage}
              >
                <DeleteForeverIcon sx={{ display: "block" }} />
              </IconButton>
            </Tooltip>
          </ButtonWrapper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
