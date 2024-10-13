import React, { useContext } from "react";

import { AppContext } from "../AppContext";
import { Box } from "@mui/joy";
import AddToDo from "./AddToDo";
import TaskList from "./TaskList";
import { motion } from "framer-motion";

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
        padding: "4px 0 4px 4px",
      }}
      id="main-content"
      role="main"
    >
      {state.isAddingTodo ? (
        <motion.div
          key="addToDo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AddToDo />
        </motion.div>
      ) : (
        <motion.div
          key="todoList"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            height: "100%",
          }}
        >
          <TaskList />
        </motion.div>
      )}
    </Box>
  );
};

export default MainContent;
