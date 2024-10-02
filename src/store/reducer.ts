import { initialState } from "./initialState";

export const reducer = (state = initialState, action: Action): AppState => {
  console.log("Reducer called with action:", action.type);

  switch (action.type) {
    case "SET_TODO_STORAGE":
      console.log("Setting todo list:", action.payload);
      return {
        ...state,
        todoStorage: action.payload,
      };
    case "SET_IS_ADDING_TODO":
      console.log("Setting isAddingTodo:", action.payload);
      return {
        ...state,
        isAddingTodo: action.payload,
      };
    case "ADD_TODO":
      console.log("Adding todo:", action.payload);
      return {
        ...state,
        todoStorage: [...state.todoStorage, action.payload],
      };
    case "UPDATE_TODO":
      console.log("Updating todo:", action.payload);
      return {
        ...state,
        todoStorage: state.todoStorage.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    case "DELETE_TODO": {
      console.log("Deleting todo:", action.payload);
      const newTodoStorage = state.todoStorage.filter(
        (todo) => todo.id !== action.payload,
      );
      // Update Chrome storage
      chrome.storage.sync.remove(action.payload, () => {
        console.log(`Todo ${action.payload} removed from storage`);
      });
      return {
        ...state,
        todoStorage: newTodoStorage,
      };
    }
    default:
      console.warn("Unknown action type:", (action as Action).type);
      return state;
  }
};
