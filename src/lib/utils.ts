export const updateTodoInStorage = (
  updatedTodo: ToDo,
  updatingCompleted: boolean,
) => {
  chrome.storage.sync.get(updatedTodo.id, (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    if (updatingCompleted) {
      updatedTodo = { ...updatedTodo, completed: !updatedTodo.completed };
    }
    if (result[updatedTodo.id]) {
      const mergedTodo = { ...result[updatedTodo.id], ...updatedTodo };
      const updatedData = {
        [updatedTodo.id]: mergedTodo,
      };

      chrome.storage.sync.set(updatedData, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.info("Todo updated successfully");
        }
      });
    } else {
      console.error("Todo not found in storage");
    }
  });
};
