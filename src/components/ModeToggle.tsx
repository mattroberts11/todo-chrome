import React from "react";

// Declare chrome as a global variable
declare const chrome: {
  storage: {
    sync: {
      get: (
        key: string,
        callback: (data: { [key: string]: string }) => void,
      ) => void;
    };
  };
};

import { useColorScheme } from "@mui/joy/styles";
import { Switch } from "@mui/joy";

import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useColorScheme();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // check if chrome.storage.sync is available to set theme
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.sync
    ) {
      chrome.storage.sync.get("theme", (data) => {
        const storedTheme: "light" | "dark" | null =
          data.theme === "dark" ? "dark" : "light"; // default to light if not set
        setMode(storedTheme);
        // necessary for server-side rendering
        // because mode is undefined on the server
        setMounted(true);
      });
    } else {
      // Fallback to system preference if chrome.storage.sync is not available
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
      setMounted(true);
    }
  }, [setMode]);
  if (!mounted) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.checked ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <Switch
      color={mode === "dark" ? "primary" : "neutral"}
      size="sm"
      slotProps={{ input: { "aria-label": "Toggle dark mode" } }}
      startDecorator={
        mode === "dark" ? (
          <LightModeIcon
            sx={{
              width: "16px",
            }}
            aria-hidden="true"
          />
        ) : (
          <LightModeOutlinedIcon
            sx={{
              width: "16px",
            }}
            aria-hidden="true"
          />
        )
      }
      endDecorator={
        <ModeNightIcon
          sx={{
            color: mode === "dark" ? "primary.500" : "text.tertiary",
            width: "16px",
          }}
          aria-hidden="true"
        />
      }
      checked={mode === "dark"}
      onChange={handleChange}
      aria-checked={mode === "dark"}
      role="switch"
    />
  );
};

export default ModeToggle;
