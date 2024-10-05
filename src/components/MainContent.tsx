import React, { useContext } from "react";

import { AppContext } from "../AppContext";
import { Box, Typography } from "@mui/joy";
import AddToDo from "./AddToDo";
import List from "./List";

const MainContent: React.FC = () => {
  const appContext = useContext(AppContext);
  const { state } = appContext;
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
      {state.isAddingTodo ? null : (
        <Typography component="h3" aria-label="All Tasks Heading">
          All Tasks
        </Typography>
      )}
      {state.isAddingTodo ? <AddToDo /> : <List />}
    </Box>
  );
};

export default MainContent;
