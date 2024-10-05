import React, { useEffect, useState } from "react";

// Declare chrome as a global variable
declare const chrome: {
  storage: {
    local: {
      get: (
        key: string,
        callback: (data: { [key: string]: string }) => void,
      ) => void;
      set: (data: { [key: string]: string }) => void;
    };
  };
};

import { useColorScheme } from "@mui/joy/styles";
import { Switch } from "@mui/joy";

import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const ModeToggle: React.FC = () => {
  const { setMode } = useColorScheme();
  const [mode, setLocalMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getInitialMode = async () => {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        chrome.storage.local.get("theme", (data) => {
          const storedTheme: "light" | "dark" =
            data.theme === "dark" ? "dark" : "light";
          setLocalMode(storedTheme);
          setMode(storedTheme);
        });
      } else {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setLocalMode(systemPrefersDark ? "dark" : "light");
        setMode(systemPrefersDark ? "dark" : "light");
      }
      setMounted(true);
    };

    getInitialMode();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? "dark" : "light";
      setLocalMode(newMode);
      setMode(newMode);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [setMode]);

  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ theme: mode });
    }
  }, [mode]);

  if (!mounted) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.checked ? "dark" : "light";
    setLocalMode(newMode);
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
