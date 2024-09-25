import { extendTheme, colors } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: colors.grey[800],
          surface: colors.grey[800],
        },
      },
    },
    light: {
      palette: {
        background: {
          body: colors.grey[100],
          surface: colors.grey[100],
          level3: colors.blue[200],
        },
      },
    },
  },
});

export default theme;
