import { extendTheme } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "#242424",
          surface: "#242424",
        },
      },
    },
    light: {
      palette: {
        background: {
          body: "#ffffff",
        },
      },
    },
  },
});

export default theme;
