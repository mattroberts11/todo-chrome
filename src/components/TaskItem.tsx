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
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Box
          className="todo-text"
          sx={{
            overflowWrap: "anywhere",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => onEdit(todo.id)}
          onMouseEnter={() => setHoveredId(todo.id)}
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
              <IconButton
                variant="plain"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(todo.id);
                }}
                sx={{
                  fontSize: "12px",
                  display: hoveredId === todo.id ? "inline-flex" : "none",
                }}
                size="sm"
              >
                <EditIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="todo-delete">
        <>
          {!todo.completed ? (
            <IconButton
              onPointerDown={(e) => dragControls?.start(e)}
              sx={{ cursor: "grab", marginRight: "5px" }}
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
