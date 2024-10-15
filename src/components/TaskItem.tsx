import React from "react";
import { Box, Checkbox, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragControls } from "framer-motion";
import TaskInput from "./TaskInput";

interface TaskItemProps {
  todo: ToDo;
  editingId: string | null;
  hoveredId: string | null;
  onCheck: (todo: ToDo) => void;
  onEdit: (todoId: string) => void;
  onEditSave: (todoId: string, newText: string) => void;
  onDelete: (todoId: string) => void;
  setHoveredId: (id: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  dragControls?: DragControls;
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  editingId,
  hoveredId,
  onCheck,
  onEdit,
  onEditSave,
  onDelete,
  setHoveredId,
  inputRef,
  dragControls,
}) => {
  return (
    <>
      <Checkbox
        className="todo-checkbox"
        size="md"
        color="primary"
        variant="outlined"
        sx={{ marginRight: "5px" }}
        checked={todo.completed}
        onChange={() => onCheck(todo)}
      />
      <Box
        className="todo-text-wrapper"
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <Box
          className="todo-text"
          sx={{
            overflowWrap: "anywhere",
            "&:hover": {
              cursor: todo.completed ? "default" : "pointer",
            },
          }}
          onClick={() => {
            if (!todo.completed) onEdit(todo.id);
          }}
          onMouseEnter={() => {
            if (!todo.completed) setHoveredId(todo.id);
          }}
          onMouseLeave={() => setHoveredId(null)}
        >
          {editingId === todo.id ? (
            <TaskInput
              initialValue={todo.text}
              inputVariant="plain"
              showButtonsUnderInput={false}
              inputRef={inputRef}
              onSave={(newText) => onEditSave(todo.id, newText)}
            />
          ) : (
            <Box
              component={"span"}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {String(todo.text)}
              <EditIcon
                sx={{
                  fontSize: "12px",
                  display: hoveredId === todo.id ? "inline-flex" : "none",
                  marginLeft: "5px",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box className="todo-delete">
        <>
          {!todo.completed ? (
            <IconButton
              onPointerDown={(e) => dragControls?.start(e)}
              sx={{
                cursor: "grab",
                marginRight: "5px",
                display: editingId !== todo.id ? "inline-flex" : "none",
              }}
            >
              <DragIndicatorIcon />
            </IconButton>
          ) : (
            <IconButton variant="plain" onClick={() => onDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      </Box>
    </>
  );
};

export default TaskItem;
