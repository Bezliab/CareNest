// src/utils/AppContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedNotify = await AsyncStorage.getItem("notifications");
      if (savedTheme) setDarkMode(savedTheme === "dark");
      if (savedNotify) setNotificationsEnabled(savedNotify === "true");
    })();
  }, []);

  const toggleTheme = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem("notifications", newValue.toString());
  };

  // 🎨 Define global themes
  const theme = darkMode
    ? {
        background: "#121212",
        text: "#FFFFFF",
        card: "#1E1E1E",
        border: "#333333",
        primary: "#BB86FC",
        secondary: "#03DAC6",
      }
    : {
        background: "#FFFFFF",
        text: "#000000",
        card: "#F8F8F8",
        border: "#E0E0E0",
        primary: "#1976D2",
        secondary: "#64B5F6",
      };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        theme,
        toggleTheme,
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
