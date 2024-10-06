import React from "react";
import { AppContext } from "../AppContext";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/joy";
import { motion, AnimatePresence } from "framer-motion";

import TaskInput from "./TaskInput";

const TodoList: React.FC = () => {
  const theme = useTheme();

  const { state, dispatch } = React.useContext(AppContext);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const updateTodoInStorage = (
    updatedTodo: ToDo,
    updatingCompleted: boolean,
  ) => {
    chrome.storage.sync.get(updatedTodo.id, (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      if (updatingCompleted) {
        updatedTodo = { ...updatedTodo, completed: !updatedTodo.completed };
      }
      if (result[updatedTodo.id]) {
        const mergedTodo = { ...result[updatedTodo.id], ...updatedTodo };
        const updatedData = {
          [updatedTodo.id]: mergedTodo,
        };

        chrome.storage.sync.set(updatedData, () => {
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
    updateTodoInStorage(todo, true);
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  };

  const handleEdit = (todoId: string) => {
    setEditingId(todoId);
  };

  const handleEditSave = (todoId: string, newText: string) => {
    const todoToUpdate = state.todoStorage.find((todo) => todo.id === todoId);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, text: newText };
      updateTodoInStorage(updatedTodo, false);
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    }
    setEditingId(null);
  };

  const renderTodoItem = (todo: ToDo) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      key={todo.id}
    >
      <ListItem
        key={`${todo.id}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          background: theme.palette.background.level3,
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "8px",
        }}
        component={motion.li}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
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
        />
        <Box
          className="todo-text-wrapper"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Box
            className="todo-text"
            sx={{
              overflowWrap: "anywhere",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => handleEdit(todo.id)}
            onMouseEnter={() => setHoveredId(todo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {editingId === todo.id ? (
              <TaskInput
                initialValue={todo.text}
                inputVariant="plain"
                showButtonsUnderInput={false}
                inputRef={inputRef}
                onSave={(newText) => handleEditSave(todo.id, newText)}
              />
            ) : (
              <Box
                component={"span"}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {String(todo.text)}
              </Box>
            )}
          </Box>
        </Box>
        <Box className="todo-delete">
          <IconButton
            variant="plain"
            onClick={() => handleEdit(todo.id)}
            sx={{
              display: hoveredId === todo.id ? "block" : "none",
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="plain"
            onClick={() => handleDelete(todo.id)}
            sx={{
              display: hoveredId === todo.id ? "none" : "block",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
    </motion.div>
  );

  const activeTodos = state.todoStorage.filter((todo) => !todo.completed);
  const completedTodos = state.todoStorage.filter((todo) => todo.completed);

  return (
    <Box>
      <Typography level="h4" sx={{ marginBottom: "16px" }}>
        Active Tasks
      </Typography>
      <AnimatePresence>
        <List>
          {activeTodos.length > 0 ? (
            activeTodos.map(renderTodoItem)
          ) : (
            <ListItem>No active todos available</ListItem>
          )}
        </List>
      </AnimatePresence>

      {completedTodos.length > 0 && (
        <>
          <Typography
            level="h4"
            sx={{ marginTop: "24px", marginBottom: "16px" }}
          >
            Completed Tasks
          </Typography>
          <AnimatePresence>
            <List>{completedTodos.map(renderTodoItem)}</List>
          </AnimatePresence>
        </>
      )}
    </Box>
  );
};

export default TodoList;
