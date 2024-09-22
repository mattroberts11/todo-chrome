import React from "react";
import { Box, IconButton, Stack } from "@mui/joy";
import { useTheme } from "@mui/joy";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import TodayIcon from "@mui/icons-material/Today";

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

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component={"footer"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        p: 1,
        bottom: 0,
        position: "sticky",
      }}
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
            <IconButton variant="plain">
              <HomeIcon sx={{ display: "block" }} />
            </IconButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <IconButton variant="plain">
              <TodayIcon sx={{ display: "block" }} />
            </IconButton>
          </ButtonWrapper>
          <Box id="mid-spacer" sx={{ width: "40px", position: "relative" }}>
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
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <ButtonWrapper>
            <IconButton variant="plain">
              <CalendarMonthIcon sx={{ display: "block" }} />
            </IconButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <IconButton variant="plain">
              <SettingsIcon sx={{ display: "block" }} />
            </IconButton>
          </ButtonWrapper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
