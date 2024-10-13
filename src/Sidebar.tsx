import React from "react";

import { Sheet } from "@mui/joy";

import { AppContext } from "./AppContext";
import RightNav from "./components/RightNav";
import MainPanel from "./components/MainPanel";

const Sidebar: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);

  const storage = chrome.storage.sync;

  React.useEffect(() => {
    loadChanges();
  }, []);

  const loadChanges = async () => {
    // get all items from storage that start with "todo_" and add to an array
    await storage.get(null, (items) => {
      console.log("Loaded todos from storage:", items);
      const todos = Object.values(items).filter(
        (item) => item.id && item.id.startsWith("todo_"),
      );
      const sortedTodos = [...todos].sort((a, b) => a.order - b.order);

      dispatch({ type: "SET_TODO_STORAGE", payload: sortedTodos });
    });
  };

  return (
    <Sheet
      id="panel-wrapper"
      variant="outlined"
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        flexGrow: 1,
        overflow: "hidden",
        border: "none",
      }}
    >
      <MainPanel />
      <RightNav />
    </Sheet>
  );
};

export default Sidebar;
