# 📋 React Context & Custom Hooks: 1-Page Mentee Cheatsheet

> Keep this reference sheet open when building React features or preparing for technical interviews.

---

## ⚡ The 30-Second Context Template

Copy and paste this pattern whenever you create a new Context:

```tsx
import React, { createContext, useContext, useState } from 'react';

// 1. Define the TypeScript shape
interface CounterContextType {
  count: number;
  increment: () => void;
  reset: () => void;
}

// 2. Create the Context with undefined default
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// 3. Create the Provider Component
export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  const value = { count, increment, reset };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

// 4. Create the Custom Hook with Guard Clause
export function useCounterContext(): CounterContextType {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('🚨 useCounterContext must be used within a <CounterProvider>!');
  }
  return context;
}
```

---

## 🪝 The Custom Hook Template

A custom hook is just a function whose name starts with `use`:

```tsx
import { useState, useCallback } from 'react';

export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

// Usage in any component:
// const { isOpen, open, close } = useDisclosure(false);
```

---

## ⚖️ Decision Matrix: What Should I Use?

| Scenario | Recommended Approach | Why? |
| :--- | :--- | :--- |
| Passing data 1–2 levels down | **Standard Props** | Simple, explicit, zero overhead. Don't reach for Context too early! |
| Sharing reusable stateful logic (modal toggle, form validation, storage sync) | **Custom Hook** | Extracts logic into pure reusable functions without cluttering UI. |
| Global/App-wide state needed in many distant components (Theme, Auth, Cart, Language) | **React Context** | Eliminates prop drilling, broadcasts state down the tree without intermediate baggage. |
| High-frequency rapid state changes (e.g. 60 FPS animations, complex multi-user canvas) | **Zustand / Redux** | Context re-renders all consumers on any state update; external stores offer granular selector subscriptions. |

---

## 📜 The 2 Golden Rules of Hooks

1. **Only Call Hooks at the Top Level:**
   - ❌ Never call hooks inside loops (`for`, `while`), conditions (`if`), or event handlers (`onClick`).
   - ✅ Always call hooks at the top of your function component before any early `return`.
2. **Only Call Hooks from React Functions:**
   - ❌ Don't call hooks in plain regular JavaScript utility files.
   - ✅ Only call hooks from React function components or from other custom hooks (functions starting with `use`).

---

## ⚠️ Top 5 Beginner Pitfalls & Quick Fixes

### 1. The Missing Provider Error
- **Symptom:** `🚨 [useTheme Hook Error]: useTheme must be used within a <ThemeProvider>!`
- **Fix:** Ensure `<App />` or `<main.tsx>` wraps the component tree inside `<ThemeProvider>...</ThemeProvider>`.

### 2. The Monolithic Context Anti-Pattern
- **Mistake:** Creating a single `AppContext` holding `theme`, `user`, `cart`, `searchQuery`, and `notifications`.
- **Why it hurts:** Changing `searchQuery` on every keystroke forces your navbar, cart, and profile cards to re-render!
- **Fix:** Split state into small, focused contexts: `ThemeContext`, `AuthContext`, `CartContext`.

### 3. Storing Derived State in Context
- **Mistake:** Storing `cartItems`, `totalPrice`, and `totalQuantity` all in `useState`.
- **Why it hurts:** You have to remember to manually synchronize 3 separate states every time an item is added or removed.
- **Fix:** Store only `cartItems` in state! Compute `totalPrice` and `totalQuantity` with `.reduce()` on the fly.

### 4. Exporting Raw Context Objects
- **Mistake:** `export const UserContext = createContext(...)` and forcing every file to write `useContext(UserContext)`.
- **Fix:** Keep `UserContext` unexported. Only export `<UserProvider>` and the custom hook `useUser()`.

### 5. Forgetting Dependency Arrays in Custom Hooks
- **Mistake:** Calling `useEffect` without dependencies or missing variables inside custom hooks.
- **Fix:** Always include every state or prop used inside `useEffect` in the dependency array, and return a cleanup function when setting timers or event listeners.
