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

  const handleReorder = (newOrder: ToDo[]) => {
    console.log("New order:", newOrder);
    const updatedOrder = newOrder.map((todo, index) => {
      return { ...todo, id: `todo_${index}`, order: index };
    });

    dispatch({ type: "SET_TODO_STORAGE", payload: updatedOrder });
    // You may want to update the order in storage as well
    // newOrder.forEach((todo, index) => {
    //   updateTodoInStorage({ ...todo, order: index }, false);
    // });

    // find the key in storage
    // swap the contents of the two keys that have changed
    // order 0 goes to todo_0
    // order 1 goes to todo_1 etc...
  };

  // const activeTodos = state.todoStorage.filter((todo) => !todo.completed);
  const completedTodos = state.todoStorage.filter((todo) => todo.completed);

  React.useEffect(() => {
    const active = state.todoStorage.filter((todo) => !todo.completed);
    console.log("Active todos:", active);
    setActiveTodos(active);
  }, [state.todoStorage]);

  return (
    <Box>
      <Typography level="h4" sx={{ marginBottom: "16px" }}>
        Active Tasks
      </Typography>
      <Reorder.Group
        // onReorder={setActiveTodos}
        onReorder={handleReorder}
        // axis="y"
        values={activeTodos}
        style={{
          position: "relative",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <AnimatePresence>
          {activeTodos.length > 0 ? (
            activeTodos.map((todo) => (
              <Reorder.Item
                key={`${todo.dragId}`}
                value={todo}
                id={todo.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
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
                  onCheck={handleCheck}
                  onEdit={handleEdit}
                  onEditSave={handleEditSave}
                  onDelete={handleDelete}
                  setHoveredId={setHoveredId}
                  inputRef={inputRef}
                  dragControls={dragControls}
                />
              </Reorder.Item>
            ))
          ) : (
            <ListItem>No active todos available</ListItem>
          )}
        </AnimatePresence>
      </Reorder.Group>

      {completedTodos.length > 0 && (
        <>
          <Typography
            level="h4"
            sx={{ marginTop: "24px", marginBottom: "16px" }}
          >
            Completed Tasks
          </Typography>
          <AnimatePresence>
            <List>
              {completedTodos.map((todo, i) => (
                <ListItem
                  key={i}
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
                    onCheck={handleCheck}
                    onEdit={handleEdit}
                    onEditSave={handleEditSave}
                    onDelete={handleDelete}
                    setHoveredId={setHoveredId}
                    inputRef={inputRef}
                    // dragRef={dragRef}
                  />
                </ListItem>
              ))}
            </List>
          </AnimatePresence>
        </>
      )}
    </Box>
  );
};

export default TodoList;
