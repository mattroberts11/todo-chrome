import React from "react";
import { AppContext } from "../AppContext";
import { Box, Checkbox, IconButton, List, ListItem } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/joy";

import TaskInput from "./TaskInput";

const TodoList: React.FC = () => {
  const theme = useTheme();

  const { state, dispatch } = React.useContext(AppContext);
  const [isEditing, setIsEditing] =
    React.useState<React.SetStateAction<boolean>>(false);

  const todoTextRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  console.log("TodoList render, state:", state);

  const handleDelete = (id: string) => {
    console.log("deleted todo with id: ", id);
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  // Function to update a single todo item in chrome.storage.sync
  const updateTodoInStorage = (
    updatedTodo: ToDo,
    updatingCompleted: boolean,
  ) => {
    // First, get the current data from storage
    chrome.storage.sync.get(updatedTodo.id, (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      if (updatingCompleted) {
        // Toggles the completed status of the todo
        updatedTodo = { ...updatedTodo, completed: !updatedTodo.completed };
      }
      // Check if the item exists in storage
      if (result[updatedTodo.id]) {
        // Merge the updated todo with the existing data
        const mergedTodo = { ...result[updatedTodo.id], ...updatedTodo };

        // Create an object with the updated todo
        const updatedData = {
          [updatedTodo.id]: mergedTodo,
        };

        // Set the updated data back to storage
        chrome.storage.sync.set(updatedData, () => {
          console.log("Updated todo:", updatedData);
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.info("Todo updated successfully");
          }
        });
      } else {
        console.error("Todo not found in storage");
      }
    });
  };

  const handleCheck = (todo: ToDo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    console.log("checked todo with todo: ", updatedTodo);
    updateTodoInStorage(todo, true);
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  };

  const handleEdit = (todo: ToDo) => {
    console.log("Editing todo: ", todo);
    setIsEditing(true);
  };

  return (
    <List>
      {state.todoStorage && state.todoStorage.length > 0 ? (
        state.todoStorage.map((todo, i) => (
          <React.Fragment key={`${todo.id}-${i}`}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                background: theme.palette.background.level3,
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "8px",
              }}
            >
              <Checkbox
                className="todo-checkbox"
                size="md"
                color="primary"
                variant="outlined"
                sx={{
                  marginRight: "5px",
                }}
                checked={todo.completed}
                onChange={() => handleCheck(todo)}
              ></Checkbox>
              <Box
                className="todo-text-wrapper"
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box
                  className="todo-text"
                  sx={{
                    overflowWrap: "anywhere",
                  }}
                  onClick={() => handleEdit(todo)}
                  ref={todoTextRef}
                >
                  {isEditing ? (
                    <TaskInput
                      initialValue={todo.text}
                      inputVariant="plain"
                      showButtonsUnderInput={false}
                      inputRef={inputRef}
                    />
                  ) : (
                    <Box
                      component={"span"}
                      sx={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {String(todo.text)}
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className="todo-delete" sx={{ marginLeft: "auto" }}>
                <IconButton variant="plain">
                  <DeleteIcon onClick={() => handleDelete(todo.id)} />
                </IconButton>
              </Box>
            </ListItem>
          </React.Fragment>
        ))
      ) : (
        <ListItem>No todos available</ListItem>
      )}
    </List>
  );
};

export default TodoList;
