// Description: This file contains all the types used in the application.
type TodoStorage = ToDo[];

// Action types
type Action =
  | { type: "SET_TODO_STORAGE"; payload: TodoStorage }
  | { type: "SET_IS_ADDING_TODO"; payload: boolean }
  | { type: "SET_TODO"; payload: ToDo }
  | { type: "CLEAR_TODO" }
  | { type: "ADD_TODO"; payload: ToDo }
  | { type: "UPDATE_TODO"; payload: { todo: ToDo; updateCompleted: boolean } }
  | { type: "DELETE_TODO"; payload: string };

// Application state
type AppState = {
  isAddingTodo: boolean;
  todoStorage: TodoStorage;
};

// Dispatch action types
type DispatchTypes =
  | "SET_TODO_STORAGE"
  | "SET_IS_ADDING_TODO"
  | "SET_TODO"
  | "CLEAR_TODO"
  | "ADD_TODO"
  | "UPDATE_TODO"
  | "DELETE_TODO";

// Individual ToDo item structure
type ToDo = {
  id: string;
  text: string;
  completed: boolean;
  dragId: string;
  dateAdded: string;
  dueDate: string;
  order: number;
};
