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
  const { dispatch } = React.useContext(AppContext);
  const [value, setValue] = useState("");
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
    dateAdded: string;
    dueDate: string;
  }

  const [todos, setTodos] = useState<Todo[]>([]);

  const storage = chrome.storage.sync;

  React.useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    await storage.get(["todos"], (result) => {
      const todos = result.todos || [];
      if (todos.length > 0) {
        setTodos(todos);
      }
    });
  };

  const handleSaveClick = async () => {
    // Retrieve the current list of todos from Chrome storage

    const todoId = todos.length + 1;

    // Add the new todo to the list
    const newTodo = {
      id: todoId,
      text: value,
      completed: false,
      dateAdded: new Date().toISOString(),
      dueDate: "",
    };
    todos.push(newTodo);
    console.log("New todo added", newTodo);
    // Save the updated list back to Chrome storage

    await storage.set({ todos: todos }, () => {
      console.log("Todo saved to Chrome storage");
      dispatch({ type: "SET_TODO_LIST", payload: todos });
      // Dispatch action to update state
      dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
    });
    console.log("sync storage", storage);
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
