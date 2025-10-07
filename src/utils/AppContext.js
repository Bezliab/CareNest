// context/AppContext.js
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

  return (
    <AppContext.Provider
      value={{
        darkMode,
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
