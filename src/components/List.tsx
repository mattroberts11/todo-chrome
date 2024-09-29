import React from "react";
import { AppContext } from "../AppContext";
import { colors, Box, List, ListItem } from "@mui/joy";
import { useTheme } from "@mui/joy";

const TodoList: React.FC = () => {
  const theme = useTheme();

  const { state } = React.useContext(AppContext);
  console.log("TodoList render, state:", state);
  /*
ToDo:
In line editing click on todo and it turns into input to edit
In line delete
Check off todo and add to completed
*/

  return (
    <List>
      {state.todoList && state.todoList.length > 0 ? (
        state.todoList.map((todo) => (
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
              <Box className="todo-date" sx={{ fontSize: "8px" }}>
                Thur. Sept 26, 2024
              </Box>
            </Box>
          </ListItem>
        ))
      ) : (
        <ListItem>No todos available</ListItem>
      )}
    </List>
  );
};

export default TodoList;
