import React, { createContext, ReactNode, useReducer } from "react";
import { initialState } from "./store/initialState";
import { reducer } from "./store/reducer";

type AppContextProps = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
