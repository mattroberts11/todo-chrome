import React from "react";
import { colors, Box, List, ListItem } from "@mui/joy";
import { useTheme } from "@mui/joy";

const todos = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build a Todo App" },
  { id: 3, text: "Profit" },
];

const TodoList: React.FC = () => {
  const theme = useTheme();
  // const isLightMode = theme.palette.mode === "light";

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            background: theme.palette.background.level3,
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "8px",
          }}
        >
          <Box
            className="todo-checkbox"
            sx={{
              width: "20px",
              height: "20px",
              border: `1px solid ${colors.blue[400]}`,
              backgroundColor: colors.blue[100],
              borderRadius: "5px",
              marginRight: "5px",
            }}
          ></Box>
          <Box
            className="todo-text-wrapper"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box className="todo-text">{todo.text}</Box>
            <Box className="todo-date" sx={{ fontSize: "12px" }}>
              Thur. Sept 26, 2024
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
