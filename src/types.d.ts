type Action =
  | { type: "SET_TODO_LIST"; payload: ToDo[] }
  | { type: "SET_IS_ADDING_TODO"; payload: boolean }
  | { type: "SET_TODO"; payload: ToDo }
  | { type: "CLEAR_TODO" };

type AppState = {
  isAddingTodo: boolean;
  todo: ToDo;
  todoList: ToDo[];
};

type DispatchTypes =
  | "SET_TODO_LIST"
  | "SET_IS_ADDING_TODO"
  | "SET_TODO"
  | "CLEAR_TODO";

type ToDo = {
  id: number;
  text: string;
  completed: boolean;
  dateAdded: string;
  dueDate: string;
};
