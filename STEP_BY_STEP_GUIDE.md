# 👶 React Context API & Custom Hooks: The Absolute Beginner's Step-by-Step Guide

> Welcome! If you have ever felt confused by React Context or Custom Hooks, this guide is written specifically for you. No jargon. No complex math. Just simple, step-by-step explanations with plain English analogies and clean code.

---

## 📑 Table of Contents
1. [Chapter 1: The Problem — What is "Prop Drilling"?](#chapter-1-the-problem--what-is-prop-drilling)
2. [Chapter 2: The Mental Model — What is Context?](#chapter-2-the-mental-model--what-is-context)
3. [Chapter 3: Step 1 of Context — `createContext()`](#chapter-3-step-1-of-context--createcontext)
4. [Chapter 4: Step 2 of Context — `<Context.Provider>`](#chapter-4-step-2-of-context--contextprovider)
5. [Chapter 5: Step 3 of Context — `useContext()`](#chapter-5-step-3-of-context--usecontext)
6. [Chapter 6: Making it Interactive — Updating Context from a Child](#chapter-6-making-it-interactive--updating-context-from-a-child)
7. [Chapter 7: Custom Hooks 101 — Demystifying the Buzzword](#chapter-7-custom-hooks-101--demystifying-the-buzzword)
8. [Chapter 8: The Golden Pair — Context + Custom Hook](#chapter-8-the-golden-pair--context--custom-hook)
9. [Chapter 9: The 2 Golden Rules of Hooks](#chapter-9-the-2-golden-rules-of-hooks)
10. [Chapter 10: When to Use Context vs Props (The Decision Guide)](#chapter-10-when-to-use-context-vs-props-the-decision-guide)

---

## Chapter 1: The Problem — What is "Prop Drilling"?

In React, data normally flows **downwards** from parent components to child components through `props`.

### 🎈 The Classroom Analogy:
Imagine 4 students sitting in a line in a classroom:
- **Alice** (Grandparent)
- **Bob** (Parent)
- **Charlie** (Child)
- **David** (Grandchild)

Alice wants to pass a note to David with the message `"Dark Mode"`.
- Alice gives the note to Bob.
- Bob doesn't care about the note, but has to stop what he is doing and hand it to Charlie.
- Charlie doesn't care either, but has to hand it to David.
- Finally, David opens the note and uses it.

In code, that looks like this:

```tsx
// ❌ THE PAIN OF PROP DRILLING:
function Grandparent() {
  const [theme, setTheme] = useState('dark');
  return <Parent theme={theme} />; // Passes to Parent
}

function Parent({ theme }) {
  return <Child theme={theme} />; // Doesn't need theme, but must pass it
}

function Child({ theme }) {
  return <Grandchild theme={theme} />; // Still doesn't need it!
}

function Grandchild({ theme }) {
  return <button className={theme}>I am {theme} mode!</button>; // Finally used!
}
```

### Why is this bad?
1. **Polluted Components:** `Parent` and `Child` have to declare props they never even use.
2. **Brittle Refactoring:** If you rename `theme` to `colorMode`, you must edit 4 different files!
3. **Tiring to write:** If a component is 7 levels deep, you have to write `theme={theme}` 7 times.

---

## Chapter 2: The Mental Model — What is Context?

Instead of passing the paper note through Bob and Charlie, what if Alice simply pinned the note to a **bulletin board** at the front of the classroom?

Now, anyone in the classroom (including David) can just look up at the bulletin board and read the note whenever they want!
Bob and Charlie don't have to touch anything.

In React:
- The **Bulletin Board** is called **Context**.
- Pinned to the board is the data (`theme = "dark"`).
- Any component inside the classroom can read from the board directly.

---

## Chapter 3: Step 1 of Context — `createContext()`

The first step is to create the Context. You do this **outside** of your components (usually in its own file or at the top of the file).

```tsx
import { createContext } from 'react';

// 1. Create the Context
export const ThemeContext = createContext('light');
```

### ❓ What does `'light'` mean?
`'light'` is just the **default fallback value**.
It is ONLY used if a component tries to read `ThemeContext` when there is **no Provider** anywhere above it in the component tree.

---

## Chapter 4: Step 2 of Context — `<Context.Provider>`

Once you create `ThemeContext`, React automatically gives you a component named `<ThemeContext.Provider>`.

Think of the Provider as the **Broadcaster** or the **Bulletin Board itself**.
You wrap your components inside it, and pass the data you want to share into the `value` prop:

```tsx
import { ThemeContext } from './ThemeContext';

export function App() {
  return (
    // 📡 Broadcast "dark" to all children inside!
    <ThemeContext.Provider value="dark">
      <Navbar />        {/* Clean! No props needed */}
      <MainContent />   {/* Clean! No props needed */}
    </ThemeContext.Provider>
  );
}
```

### ⚠️ Golden Rule:
The Provider must be placed **ABOVE** the components that want to read the data.

---

## Chapter 5: Step 3 of Context — `useContext()`

Now, how does a child component actually read the data?
By calling React's built-in **`useContext()`** hook!

```tsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function DeepChildButton() {
  // 📻 Look at the bulletin board and grab the value!
  const theme = useContext(ThemeContext);

  return <button className={theme}>I am {theme} mode!</button>;
}
```

That's it! In just 3 steps:
1. `createContext()` creates the channel.
2. `<ThemeContext.Provider value={...}>` broadcasts the value.
3. `useContext(ThemeContext)` reads the value.

---

## Chapter 6: Making it Interactive — Updating Context from a Child

Beginners often ask:
*"Reading data is great, but what if a button inside DeepChildButton needs to CHANGE the theme?"*

### The Solution:
You pass **both** the state variable AND the `useState` setter function into the Provider's `value` object!

```tsx
// 1. In your App / Provider component:
import { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function App() {
  const [theme, setTheme] = useState('light');

  // Pass BOTH the value and the setter function!
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <PageLayout />
    </ThemeContext.Provider>
  );
}
```

```tsx
// 2. In any child component:
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeToggle() {
  // Destructure both the value AND the setter!
  const { theme, setTheme } = useContext(ThemeContext);

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggle}>
      Current: {theme} (Click to toggle)
    </button>
  );
}
```

When `setTheme()` is called inside the child, React updates the state at the top in `App`, and every component reading `ThemeContext` re-renders with the new value automatically!

---

## Chapter 7: Custom Hooks 101 — Demystifying the Buzzword

Many beginners are intimidated by the word "Custom Hook". They think it is advanced wizardry.

Here is the secret:
> **A Custom Hook is literally just a normal JavaScript function whose name starts with `"use"` and that calls other React hooks.**

### Why write one?
Imagine you have 5 different components that all need a boolean toggle (modal open/close, dropdown, mobile menu, accordion):

```tsx
// ❌ Repetitive code in every component:
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(prev => !prev);
```

Instead of writing that in 5 files, we extract it into a reusable function called `useToggle`:

```tsx
// 🪝 Our Custom Hook: useToggle.ts
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle] as const;
}
```

Now, any component can use it in 1 line:

```tsx
function Modal() {
  const [isOpen, toggleModal] = useToggle(false);
  return (
    <div>
      <button onClick={toggleModal}>Toggle Modal</button>
      {isOpen && <div>Modal Content</div>}
    </div>
  );
}

function Dropdown() {
  const [isOpen, toggleDropdown] = useToggle(false);
  return (
    <div>
      <button onClick={toggleDropdown}>Options ▼</button>
      {isOpen && <ul><li>Item 1</li></ul>}
    </div>
  );
}
```
Notice how clean that is! The stateful logic is reused, but each component has its own independent state.

---

## Chapter 8: The Golden Pair — Context + Custom Hook

In real production React apps, senior developers combine Context and Custom Hooks together into a clean, safe pattern.

Instead of writing `useContext(ThemeContext)` in every file, we create a custom hook named `useTheme()`:

```tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

// 1. Create context (with undefined as default)
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | undefined>(undefined);

// 2. The Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. The Custom Hook with the GUARD CLAUSE
export function useTheme() {
  const context = useContext(ThemeContext);

  // 🛡️ The Guard Clause:
  if (!context) {
    throw new Error('🚨 useTheme must be used within a <ThemeProvider>!');
  }

  return context;
}
```

### Why is this pattern so popular?
1. **Single Import:** Components only need to `import { useTheme } from './ThemeContext'` instead of importing both `useContext` and `ThemeContext`.
2. **The Guard Clause:** If someone forgets to wrap their app in `<ThemeProvider>`, React gives an immediate, clear error message telling them exactly what is wrong.
3. **Security:** The raw `ThemeContext` object is kept private and not exported.

---

## Chapter 9: The 2 Golden Rules of Hooks

React has 2 strict rules for hooks (both built-in hooks and custom hooks):

1. **Only Call Hooks at the Top Level**
   - ❌ Never put hooks inside `if` statements, loops (`for`), or event handlers (`onClick`).
   - ✅ Always call them at the very top of your function component.
2. **Only Call Hooks from React Functions**
   - ❌ Don't call hooks from regular vanilla JS helper files (like `formatDate.ts`).
   - ✅ Only call them from React function components or other custom hooks.

---

## Chapter 10: When to Use Context vs Props (The Decision Guide)

| Scenario | What to Use | Why? |
| :--- | :--- | :--- |
| Passing data 1–2 levels down | **Standard Props** | Simple, explicit, zero boilerplate. Don't reach for Context too early! |
| Reusing state logic (toggle, form validation, timers) | **Standalone Custom Hook** | Keeps logic clean and reusable without needing global context. |
| Data needed by many components across the whole app (Theme, Current User, Shopping Cart, Language) | **React Context + Custom Hook** | Eliminates prop drilling completely and broadcasts state everywhere. |

---

## 🚀 Ready to Try It?

1. Start the interactive app:
   ```bash
   pnpm dev
   ```
2. Open `http://localhost:5173` and walk through the **🌱 Step-by-Step Guide**!
3. Check out the hands-on challenges in **[EXERCISES.md](./EXERCISES.md)** to test your skills!
