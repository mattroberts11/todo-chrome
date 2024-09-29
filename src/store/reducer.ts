export const reducer = (state: AppState, action: Action): AppState => {
  console.log("Reducer called with action:", action.type);

  switch (action.type) {
    case "SET_TODO_LIST":
      console.log("Setting todo list:", action.payload);
      return {
        ...state,
        todoList: action.payload,
      };
    case "SET_IS_ADDING_TODO":
      console.log("Setting isAddingTodo:", action.payload);
      return {
        ...state,
        isAddingTodo: action.payload,
      };
    case "SET_TODO":
      console.log("Setting todo:", action.payload);
      return { ...state, todo: action.payload };
    case "CLEAR_TODO":
      console.log("Clearing todo");
      return {
        ...state,
        todo: { id: 0, text: "", completed: false, dateAdded: "", dueDate: "" },
      };
    default:
      console.warn("Unknown action type:", (action as Action).type);
      return state;
  }
};
