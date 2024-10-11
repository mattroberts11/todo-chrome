import React, { useContext } from "react";

import { AppContext } from "../AppContext";
import { Box } from "@mui/joy";
import AddToDo from "./AddToDo";
import TaskList from "./TaskList";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
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
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TaskList />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MainContent;
