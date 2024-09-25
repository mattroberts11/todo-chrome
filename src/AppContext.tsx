import React, { createContext, ReactNode } from "react";

type AppContextProps = {
  state: string;
  dispatch: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useState<string>("");

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
