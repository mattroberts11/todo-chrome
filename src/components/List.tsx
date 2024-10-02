import React from "react";
import { AppContext } from "../AppContext";
import { colors, Box, IconButton, List, ListItem } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/joy";

const TodoList: React.FC = () => {
  const theme = useTheme();

  const { state, dispatch } = React.useContext(AppContext);
  console.log("TodoList render, state:", state);
  /*
ToDo:
In line editing click on todo and it turns into input to edit
In line delete
Check off todo and add to completed
*/
  const handleDelete = (id: string) => {
    console.log("deleted todo with id: ", id);
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <List>
      {state.todoStorage && state.todoStorage.length > 0 ? (
        state.todoStorage.map((todo, i) => (
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
              <Box className="todo-text">{String(todo.text)}</Box>
              <Box className="todo-date" sx={{ fontSize: "8px" }}>
                Thur. Sept 26, 2024
              </Box>
            </Box>
            <Box className="todo-delete" sx={{ marginLeft: "auto" }}>
              <IconButton variant="soft">
                <DeleteIcon onClick={() => handleDelete(todo.id)} />
              </IconButton>
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
