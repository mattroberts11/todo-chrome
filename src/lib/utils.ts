import debounce from "lodash/debounce";

export const updateTodoInStorage = (updatedTodo: ToDo) => {
  chrome.storage.sync.get(updatedTodo.id, (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
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

export const updateChromeStorage = (todoArray: TodoStorage) => {
  const updatePromises = todoArray.map((todo) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [todo.id]: todo }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(void 0);
        }
      });
    });
  });

  Promise.all(updatePromises)
    .then(() => {
      console.log("All todos updated successfully in sync.storage");
    })
    .catch((error) => {
      console.error("Error updating todos in sync.storage:", error);
    });
};

export const debouncedUpdateChromeStorage = debounce(updateChromeStorage, 1000);

export const generateNewTodoId = (todoStorage: TodoStorage) => {
  const largestIdNum = todoStorage.reduce((acc, todo) => {
    const num = parseInt(todo.id.split("_")[1]);
    return num > acc ? num : acc;
  }, 0);

  return `todo_${largestIdNum + 1}`;
};
