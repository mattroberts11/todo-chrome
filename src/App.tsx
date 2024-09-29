import React from "react";
import "@fontsource/inter";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import { AppProvider } from "./AppContext";

import "./App.css";
import theme from "./theme";
import Sidebar from "./Sidebar";

const App: React.FC = () => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Sidebar />
      </AppProvider>
    </CssVarsProvider>
  );
};

export default App;
