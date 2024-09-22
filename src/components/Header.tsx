import React from "react";
import { Box, Typography } from "@mui/joy";

import ModeToggle from "./ModeToggle";

const Header: React.FC = () => (
  <Box
    component={"header"}
    sx={{
      display: "flex",
      justifyContent: "space-between",
      height: "64px",
      p: 2,
      top: 0,
      position: "sticky",
    }}
  >
    <Typography level="h4" component="h1">
      ToDo Today!
    </Typography>
    <ModeToggle />
  </Box>
);

export default Header;
