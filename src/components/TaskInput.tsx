import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Box,
  Typography,
  Input,
  FormControl,
  IconButton,
} from "@mui/joy";
import { AppContext } from "../AppContext";
import SaveIcon from "@mui/icons-material/Save";

const TaskInput = ({
  initialValue,
  inputVariant = "outlined",
  showButtonsUnderInput,
  inputRef,
  inputSize,
  marginTop,
  onSave,
}: {
  initialValue: string;
  inputVariant: "plain" | "outlined" | "soft" | "solid";
  showButtonsUnderInput?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  inputSize?: "sm" | "md" | "lg";
  marginTop?: number;
  onSave?: (newText: string) => void;
}): JSX.Element => {
  const { state, dispatch } = React.useContext(AppContext);
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [remainingChars, setRemainingChars] = useState<number | null>(null);
  const dragId = React.useId();

  const storage = chrome.storage.sync;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input change event:", e.target.value); // Debug log
    const inputValue = (e.target as HTMLInputElement).value;
    if (inputValue.length <= 400) {
      setValue(inputValue);
      if (inputValue.length >= 300) {
        setRemainingChars(400 - inputValue.length);
      } else {
        setRemainingChars(null);
      }
      setError(null);
    } else {
      setError("Character limit of 400 reached");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (onSave) {
        onSave(value);
      } else {
        handleSave();
      }
    } else if (event.key === "Escape") {
      if (onSave) {
        onSave(initialValue);
      } else {
        handleCancel();
      }
    }
  };

  const handleSave = useCallback(async () => {
    console.log("Saving todo with value:", value); // Debug log
    if (value.trim() === "") {
      setError("The task cannot be empty");
      return;
    }
    // TODO:
    // check if the key from storage already exists
    // if it does, increment the key by 1

    const todoId = (state.todoStorage?.length ?? 0).toString();

    const todoKey = "todo_" + todoId;
    const newTodo: ToDo = {
      id: todoKey,
      text: value,
      completed: false,
      dateAdded: new Date().toISOString(),
      dragId: dragId,
      dueDate: "",
      order: state.todoStorage?.length ?? 0,
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

  const handleCancel = () => {
    dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
    setValue(""); // Clear the input on cancel
    setError(null); // clear any errors
  };

  return (
    <Box>
      <Box>
        <FormControl>
          <Input
            placeholder="Add a new task"
            variant={inputVariant}
            color="primary"
            endDecorator={
              <>
                <IconButton variant="soft">
                  <SaveIcon />
                </IconButton>
              </>
            }
            slotProps={{
              input: {
                ref: inputRef,
                value: value,
                onKeyDown: handleKeyDown,
                onChange: handleInputChange,
              },
            }}
            size={inputSize}
            aria-label="New Task Input"
            sx={{ mt: marginTop }}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {remainingChars !== null && (
            <Typography level="body-xs" color="warning">
              {remainingChars} characters remaining
            </Typography>
          )}
        </FormControl>
        {error && (
          <Alert color="danger" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
      {showButtonsUnderInput && (
        <Box sx={{ display: "flex", mt: 1 }}>
          <Button size="md" onClick={handleSave} sx={{ marginRight: "8px" }}>
            Save
          </Button>
          <Button size="sm" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TaskInput;
