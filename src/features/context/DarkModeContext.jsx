import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  DarkModeToggle: () => {},
});

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "theme");
  function darkModeToggle() {
    setIsDarkMode((dark) => !dark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, darkModeToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === null)
    throw new Error(
      "DarkModeContext was used outside of DarkModeContextProvider"
    );

  return context;
}

export { useDarkMode, DarkModeContextProvider };
