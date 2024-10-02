import React, { useState } from "react";

import { AppContext } from "../AppContext";
import {
  Box,
  Button,
  Typography,
  Input,
  FormControl,
  FormLabel,
} from "@mui/joy";

const AddToDo: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [value, setValue] = useState("");

  const storage = chrome.storage.sync;

  const handleSaveClick = async () => {
    const todoId = (state.todoStorage?.length ? 1 : 0).toString();
    const todoKey = "todo_" + todoId;
    // Add the new todo to the list
    const newTodo: ToDo = {
      id: todoKey,
      text: value,
      completed: false,
      dateAdded: new Date().toISOString(),
      dueDate: "",
    };

    // Save the todo to Chrome storage
    await storage.set({ [todoKey]: newTodo }, () => {
      console.log("Todo saved to Chrome storage", { [todoKey]: newTodo });
      dispatch({ type: "ADD_TODO", payload: newTodo });
      dispatch({ type: "SET_IS_ADDING_TODO", payload: false }); // shows the or hides the add form
    });
  };
  const handleCancelClick = () => {
    dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
  };

  return (
    <>
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
        <FormControl>
          <FormLabel>Add Task</FormLabel>
          <Input
            placeholder="Add a new task"
            variant="outlined"
            color="primary"
            size="lg"
            aria-label="New Task Input"
            sx={{ mt: 2 }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button size="sm" variant="soft" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSaveClick}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default AddToDo;
