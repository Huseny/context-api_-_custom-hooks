import React, { createContext, useContext, useState, useEffect } from "react";
import type { Theme, ThemeContextType } from "../types";

/**
 * 🎓 LESSON: The 3-Step Context Formula + Custom Hook Pattern
 * ============================================================
 *
 * Step 1: createContext()  --> The "Radio Channel / Blueprint"
 * Step 2: <Context.Provider> --> The "Broadcaster / Transmitter"
 * Step 3: Custom Hook (useTheme) -> The "Radio Receiver / Tuner" + Guard Clause
 *
 * 💡 WHY INITIALIZE WITH `undefined`?
 * Beginners often pass a dummy object like `{ theme: 'light', toggleTheme: () => {} }`
 * to `createContext()`. While that works, if a developer accidentally forgets to wrap
 * their component in `<ThemeProvider>`, React will quietly use the dummy values and NOT
 * give an error!
 * By using `undefined` as the default, our custom hook can check `if (!context)` and throw
 * a helpful error immediately!
 */

// Step 1: Create the Context (Radio Channel)
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Step 2: Create the Provider Component (Broadcaster)
interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("app_theme");
    if (saved === "light" || saved === "dark") {
      return saved as Theme;
    } else {
      return "light";
    }
  });

  // Persist preference to localStorage
  useEffect(() => {
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // Sync with document element class for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "light";
      return "light";
    });
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Step 3: Custom Hook with the GUARD CLAUSE
 * -----------------------------------------
 * Instead of forcing consumers to write:
 *   const context = useContext(ThemeContext);
 * in every component, we provide `useTheme()`.
 *
 * 🛡️ The Guard Clause:
 * If a developer calls `useTheme()` in a component that is NOT wrapped inside
 * `<ThemeProvider>`, `context` will be `undefined`.
 * Instead of cryptic `Cannot read properties of undefined` errors later on,
 * this check throws an unmistakable error explaining exactly what went wrong!
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "🚨 [useTheme Hook Error]: useTheme must be used within a <ThemeProvider>! " +
        "Make sure you have wrapped your component tree with <ThemeProvider> in App.tsx or main.tsx.",
    );
  }

  return context;
}
