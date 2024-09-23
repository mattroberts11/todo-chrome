import React from "react";
import { Box, Typography } from "@mui/joy";

import ModeToggle from "./ModeToggle";

const Header: React.FC = () => (
  <Box
    component={"header"}
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "54px",
      p: 1,
      top: 0,
      position: "sticky",
    }}
  >
    <Typography level="h4" component="h1" aria-label="Application Title">
      ToDo Today!
    </Typography>
    <ModeToggle />
  </Box>
);

export default Header;
