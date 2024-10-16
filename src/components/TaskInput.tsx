import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Button,
  Box,
  Typography,
  Input,
  FormControl,
  Chip,
} from "@mui/joy";
import { AppContext } from "../AppContext";
import { generateNewTodoId } from "../lib/utils";

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

  const storage = chrome.storage.sync;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (value.trim() === "") {
      setError("The task cannot be empty");
      return;
    }
    // generate a random number for the dragId
    const dragId = Math.floor(Math.random() * 1000000).toString();

    const newTodoId = generateNewTodoId(state.todoStorage);

    const newTodo: ToDo = {
      id: newTodoId,
      text: value,
      completed: false,
      dateAdded: new Date().toISOString(),
      dragId: dragId,
      dueDate: "",
      order: state.todoStorage?.length ?? 0,
    };

    try {
      await storage.set({ [newTodoId]: newTodo });
      dispatch({ type: "ADD_TODO", payload: newTodo });
      dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setValue("");
    }
  }, [value, state.todoStorage, dispatch, storage]);

  const handleCancel = () => {
    dispatch({ type: "SET_IS_ADDING_TODO", payload: false });
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
                <Chip
                  size="sm"
                  variant="solid"
                  color="neutral"
                  sx={{ opacity: 0.7 }}
                >
                  Enter
                </Chip>
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
