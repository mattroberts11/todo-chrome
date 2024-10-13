import { initialState } from "./initialState";

export const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "SET_TODO_STORAGE":
      return {
        ...state,
        todoStorage: action.payload,
      };
    case "SET_IS_ADDING_TODO":
      return {
        ...state,
        isAddingTodo: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todoStorage: [...state.todoStorage, action.payload],
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todoStorage: state.todoStorage.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    case "DELETE_TODO": {
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
