import { extendTheme, colors } from "@mui/joy";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: colors.grey[800],
          surface: colors.grey[800],
        },
        warning: {
          500: "#fdd835",
          solidBg: colors.yellow[500],
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
        warning: {
          500: "#ffeb3b",
          solidBg: colors.yellow[500],
        },
      },
    },
  },
  components: {
    JoySwitch: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "warning" && {
            "--Switch-track-background": "var(--joy-palette-warning-500)",
            "--Switch-track-stop-color": "var(--joy-palette-warning-500)",
            "--Switch-thumb-color": "#fff",
            "&:hover": {
              "--Switch-track-background": "var(--joy-palette-warning-600)",
              "--Switch-track-stop-color": "var(--joy-palette-warning-600)",
            },
          }),
        }),
      },
    },
  },
});

export default theme;
