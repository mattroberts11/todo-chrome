import React, { useEffect, useCallback, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { Alert, Box, Button, Typography, Input, FormControl } from "@mui/joy";

const AddToDo: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [remainingChars, setRemainingChars] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const storage = chrome.storage.sync;

  const handleSaveClick = useCallback(async () => {
    console.log("Saving todo with value:", value); // Debug log
    if (value.trim() === "") {
      setError("The task cannot be empty");
      return;
    }

    const todoId = (state.todoStorage?.length ?? 0).toString();
    const todoKey = "todo_" + todoId;
    const newTodo: ToDo = {
      id: todoKey,
      text: value,
      completed: false,
      dateAdded: new Date().toISOString(),
      dueDate: "",
    };

    console.log("New todo object:", newTodo); // Debug log

    try {
      await storage.set({ [todoKey]: newTodo });
      dispatch({ type: "ADD_TODO", payload: newTodo });
      dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
      // setValue(""); // Clear the input after saving
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setValue("");
    }
  }, [value, state.todoStorage, dispatch, storage]);

  const handleCancelClick = () => {
    dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
    setValue(""); // Clear the input on cancel
    setError(null); // clear any errors
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSaveClick();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
      inputElement.focus();
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleSaveClick]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 400) {
      setValue(e.target.value);
      if (inputValue.length >= 50) {
        setRemainingChars(400 - inputValue.length);
      } else {
        setRemainingChars(null);
      }
    } else {
      setError("Character limit of 400 reached");
    }
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
        {error && (
          <Alert color="danger" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        <FormControl>
          <Input
            placeholder="Add a new task"
            variant="outlined"
            color="primary"
            slotProps={{
              input: {
                ref: inputRef,
                value: value,
              },
            }}
            size="lg"
            aria-label="New Task Input"
            sx={{ mt: 2 }}
            onChange={handleInputChange}
          />
          {remainingChars !== null && (
            <Typography level="body-xs" color="warning">
              {remainingChars} characters remaining
            </Typography>
          )}
        </FormControl>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button size="md" onClick={handleSaveClick} sx={{ marginRight: "8px" }}>
          Save
        </Button>
        <Button size="sm" variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default AddToDo;
