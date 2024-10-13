import React from "react";
import { AppContext } from "../AppContext";
import { Box, List, ListItem, Typography } from "@mui/joy";

import { useTheme } from "@mui/joy";
import {
  motion,
  AnimatePresence,
  Reorder,
  useDragControls,
} from "framer-motion";
import { updateTodoInStorage } from "../lib/utils";
import TaskItem from "./TaskItem";

const TodoList: React.FC = () => {
  const theme = useTheme();

  const { state, dispatch } = React.useContext(AppContext);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [activeTodos, setActiveTodos] = React.useState<ToDo[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleCheckCompleted = (todo: ToDo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodoInStorage(updatedTodo);
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  };

  const handleEdit = (todoId: string) => {
    setEditingId(todoId);
  };

  const handleEditSave = (todoId: string, newText: string) => {
    const todoToUpdate = state.todoStorage.find((todo) => todo.id === todoId);
    if (todoToUpdate) {
      const updatedTodo = { ...todoToUpdate, text: newText };
      updateTodoInStorage(updatedTodo);
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    }
    setEditingId(null);
  };

  function updateChromeStorage(todoArray: TodoStorage) {
    const updatePromises = todoArray.map((todo) => {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ [todo.id]: todo }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(void 0);
          }
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        console.log("All todos updated successfully in sync.storage");
      })
      .catch((error) => {
        console.error("Error updating todos in sync.storage:", error);
      });
  }

  const handleReorder = (newOrder: ToDo[]) => {
    console.log("New order:", newOrder);
    const updatedOrder = newOrder.map((todo, index) => {
      return { ...todo, id: `todo_${index}`, order: index };
    });
    console.log("Updated order:", updatedOrder);
    // need to add completed todos to the end of the list so they don't get cleared out of state
    const updatedOrderWithCompleted = [...updatedOrder, ...completedTodos];

    dispatch({ type: "SET_TODO_STORAGE", payload: updatedOrderWithCompleted });
    updateChromeStorage(updatedOrderWithCompleted);
  };

  // const activeTodos = state.todoStorage.filter((todo) => !todo.completed);
  const completedTodos = state.todoStorage.filter((todo) => todo.completed);

  React.useEffect(() => {
    const active = state.todoStorage.filter((todo) => !todo.completed);
    setActiveTodos(active);
  }, [state.todoStorage]);

  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "calc(100vh - 150px)",
      }}
    >
      {activeTodos.length > 0 ? (
        <AnimatePresence>
          <Typography
            key="active-tasks-heading"
            level="h4"
            sx={{ marginBottom: "16px" }}
          >
            Active Tasks
          </Typography>
          <Reorder.Group
            onReorder={handleReorder}
            values={activeTodos}
            axis="y"
            style={{
              position: "relative",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {activeTodos.map((todo) => (
              <Reorder.Item
                key={`active-${todo.dragId}`}
                value={todo}
                id={todo.dragId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  background: theme.palette.background.level3,
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "8px",
                  alignItems: "center",
                }}
              >
                <TaskItem
                  todo={todo}
                  editingId={editingId}
                  hoveredId={hoveredId}
                  onCheck={handleCheckCompleted}
                  onEdit={handleEdit}
                  onEditSave={handleEditSave}
                  onDelete={handleDelete}
                  setHoveredId={setHoveredId}
                  inputRef={inputRef}
                  dragControls={dragControls}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </AnimatePresence>
      ) : (
        <ListItem key="noActiveTasks">No active tasks</ListItem>
      )}

      {completedTodos.length > 0 && (
        <AnimatePresence>
          <Typography
            key="completed-tasks-heading"
            component={motion.h4}
            level="h4"
            sx={{ marginTop: "24px", marginBottom: "16px" }}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Completed Tasks
          </Typography>

          <List>
            {completedTodos.map((todo) => (
              <ListItem
                key={`completed-${todo.dragId}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  background: theme.palette.background.level3,
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "8px",
                }}
                component={motion.li}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TaskItem
                  todo={todo}
                  editingId={editingId}
                  hoveredId={hoveredId}
                  onCheck={handleCheckCompleted}
                  onEdit={handleEdit}
                  onEditSave={handleEditSave}
                  onDelete={handleDelete}
                  setHoveredId={setHoveredId}
                  inputRef={inputRef}
                />
              </ListItem>
            ))}
          </List>
        </AnimatePresence>
      )}
    </Box>
  );
};

export default TodoList;
