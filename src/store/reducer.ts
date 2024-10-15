import { initialState } from "./initialState";
import { updateChromeStorage } from "../lib/utils";

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
    case "UPDATE_TODO": {
      const toDoToUpdate = action.payload.todo as ToDo;
      let updatedTodoData: TodoStorage;
      if (action.payload.updateCompleted) {
        const newOrder = state.todoStorage.length;
        updatedTodoData = state.todoStorage.map((todo) =>
          todo.id === toDoToUpdate.id
            ? {
                ...toDoToUpdate,
                order: newOrder,
                completed: !toDoToUpdate.completed,
              }
            : todo,
        );
      } else {
        updatedTodoData = state.todoStorage.map((todo) =>
          todo.id === toDoToUpdate.id ? toDoToUpdate : todo,
        );
      }
      // update the chrome storage
      updateChromeStorage(updatedTodoData);
      return {
        ...state,
        todoStorage: updatedTodoData,
      };
    }

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
