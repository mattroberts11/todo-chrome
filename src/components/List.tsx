import React from "react";
import { AppContext } from "../AppContext";
import { Box, Checkbox, IconButton, List, ListItem } from "@mui/joy";
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
            <Checkbox
              className="todo-checkbox"
              size="md"
              color="primary"
              variant="outlined"
              sx={{
                marginRight: "5px",
              }}
            ></Checkbox>
            <Box
              className="todo-text-wrapper"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box className="todo-text" sx={{ overflowWrap: "anywhere" }}>
                {String(todo.text)}
              </Box>
              <Box className="todo-date" sx={{ fontSize: "8px" }}>
                Thur. Sept 26, 2024
              </Box>
            </Box>
            <Box className="todo-delete" sx={{ marginLeft: "auto" }}>
              <IconButton variant="plain">
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
