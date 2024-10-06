import React from "react";

import { Box, Typography } from "@mui/joy";
import TaskInput from "./TaskInput";

const AddToDo: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 0,
        p: 1,
      }}
      id="main-content"
      role="main"
    >
      <Typography component="h3" aria-label="All Tasks Heading">
        Add ToDo
      </Typography>
      <TaskInput
        initialValue=""
        inputVariant="outlined"
        showButtonsUnderInput={true}
        inputRef={inputRef}
      />
    </Box>
  );
};

export default AddToDo;
