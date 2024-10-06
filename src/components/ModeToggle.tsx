import React, { useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy/styles";
import { Switch } from "@mui/joy";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightIcon from "@mui/icons-material/ModeNight";

// Declare chrome as a global variable
declare const chrome: {
  storage: {
    sync: {
      get: (
        key: string,
        callback: (data: { [key: string]: string }) => void,
      ) => void;
      set: (data: { [key: string]: string }, callback?: () => void) => void;
    };
  };
};

const ModeToggle: React.FC = () => {
  const { mode: globalMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getInitialMode = () => {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.sync
      ) {
        chrome.storage.sync.get("theme", (data) => {
          const storedTheme = data.theme === "dark" ? "dark" : "light";
          setMode(storedTheme);
          setMounted(true);
        });
      } else {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setMode(systemPrefersDark ? "dark" : "light");
        setMounted(true);
      }
    };

    getInitialMode();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? "dark" : "light";
      setMode(newMode);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setMode]);

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.sync
    ) {
      chrome.storage.sync.set({ theme: globalMode || "light" }, () => {
        console.log("Theme saved:", globalMode);
      });
    }
  }, [globalMode]);

  if (!mounted) {
    return null;
  }

  const handleChange = () => {
    const newMode = globalMode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <Switch
      color={globalMode === "dark" ? "primary" : "neutral"}
      size="sm"
      slotProps={{ input: { "aria-label": "Toggle dark mode" } }}
      startDecorator={
        globalMode === "dark" ? (
          <LightModeIcon sx={{ width: "16px" }} aria-hidden="true" />
        ) : (
          <LightModeOutlinedIcon sx={{ width: "16px" }} aria-hidden="true" />
        )
      }
      endDecorator={
        <ModeNightIcon
          sx={{
            color: globalMode === "dark" ? "primary.500" : "text.tertiary",
            width: "16px",
          }}
          aria-hidden="true"
        />
      }
      checked={globalMode === "dark"}
      onChange={handleChange}
      aria-checked={globalMode === "dark"}
      role="switch"
    />
  );
};

export default ModeToggle;
