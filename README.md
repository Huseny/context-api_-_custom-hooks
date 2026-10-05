# ⚛️ React Context API & Custom Hooks Masterclass

> A comprehensive, beginner-friendly interactive guide and codebase designed to teach **React Context API** and **Custom Hooks** step-by-step with zero confusing jargon, real-world analogies, and hands-on code.

---

## 🌟 Start Here: Absolute Beginner Friendly!

If you are new to Context API or Custom Hooks:
1. 📖 **Read the Step-by-Step Written Guide:** **[STEP_BY_STEP_GUIDE.md](./STEP_BY_STEP_GUIDE.md)** (A 10-chapter gentle handbook explaining every concept from scratch).
2. 💻 **Launch the Interactive App:** Run `pnpm dev` and follow the **🌱 Step-by-Step Guide** interactive stepper!
3. 📋 **Keep the Cheat Sheet Handy:** **[MENTEE_CHEATSHEET.md](./MENTEE_CHEATSHEET.md)** (30-second copy-paste templates and Do's & Don'ts).
4. 🏋️ **Practice Hands-On:** **[EXERCISES.md](./EXERCISES.md)** (5 progressive challenges with starter code and solutions).

---

## 🎯 What You Will Learn (The 9-Step Journey)

In this repository, you will learn step-by-step:

1. **Step 1: The Problem (Prop Drilling)** — The classroom whisper game: why passing props through 4 components that don't care is painful.
2. **Step 2: The Solution (What is Context?)** — The bulletin board metaphor: pinning a message so anyone can read it without passing paper.
3. **Step 3: `createContext()`** — Step 1 of the 3-step formula: setting up the context channel outside your components.
4. **Step 4: `<Context.Provider value={...}>`** — Step 2: broadcasting the data to every component inside.
5. **Step 5: `useContext(Context)`** — Step 3: reading the data directly with zero intermediate props.
6. **Step 6: Updating State from Children** — Passing `useState` setter functions in the `value` object so child buttons can toggle the state.
7. **Step 7: Custom Hooks 101** — Demystifying custom hooks: "It's just a normal JavaScript function starting with `use` that calls other hooks."
8. **Step 8: The Golden Pair (Context + Hook)** — Wrapping `useContext` inside `useTheme()` with a **Guard Clause** to catch missing providers instantly.
9. **Step 9: Real-World Capstone Project** — Exploring how `ThemeContext`, `AuthContext`, and `CartContext` work together with a live real-time state inspector!

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org) (v18+) installed:

```bash
# 1. Install dependencies
pnpm install
# (or: npm install)

# 2. Start the development server
pnpm dev
# (or: npm run dev)
```

Open your browser at **`http://localhost:5173`**.

To verify code quality and build:
```bash
pnpm lint   # Run ESLint (0 errors, 0 warnings)
pnpm build  # TypeScript compilation & production bundle
```

---

## 🧠 Core Mental Models

### 1. The Bulletin Board Metaphor (Context API)

```
        📌 Bulletin Board (<Context.Provider value={data}>)
                     /            |            \
                    /             |             \
                   v              v              v
        [Living Room Radio]  [Kitchen Radio]  [Garage Radio]
         useContext(Radio)   useContext(Radio)  useContext(Radio)
```
- No physical wires or notes are passed between intermediate rooms.
- Any child component inside the building can look up at the board and read the data!

### 2. The 3-Step Context Formula

```tsx
// 1. Create the Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Wrap your tree with the Provider & supply 'value'
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume via a Custom Hook with a Guard Clause
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within <ThemeProvider>!');
  }
  return context;
}
```

### 3. What is a Custom Hook?

A Custom Hook is simply a function that:
1. Starts with the prefix **`use`** (e.g. `useToggle`, `useCart`).
2. Calls other React hooks (`useState`, `useEffect`, etc.).

```tsx
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}
```

---

## 📂 Project Structure

```text
pricing-page/
├── STEP_BY_STEP_GUIDE.md               # 👶 Complete 10-chapter beginner written handbook
├── MENTEE_CHEATSHEET.md                # 📋 1-page quick syntax reference card
├── EXERCISES.md                        # 🏋️ 5 hands-on practice challenges with solutions
├── README.md                           # 📖 Overview & curriculum guide
├── src/
│   ├── lessons/
│   │   ├── 00-beginner-guide/
│   │   │   └── StepByStepGuide.tsx     # 🌱 Interactive 9-step guided walkthrough + mini quizzes
│   │   ├── 01-prop-drilling/
│   │   │   └── PropDrillingDemo.tsx    # Interactive drill simulator showing passenger components
│   │   ├── 02-context-basics/
│   │   │   └── ContextBasicsDemo.tsx   # Radio Station live transmitter demo & 3-step formula
│   │   ├── 03-custom-hooks-with-context/
│   │   │   └── CustomHookContextDemo.tsx # Guard Clause demo & simulated missing provider test
│   │   ├── 04-standalone-hooks/
│   │   │   └── StandaloneHooksDemo.tsx # Interactive lab for useToggle, useLocalStorage, etc.
│   │   └── 05-capstone-store/
│   │       ├── StoreNavbar.tsx         # Consumes AuthContext & CartContext
│   │       ├── ProductCard.tsx         # Dispatches addToCart via useCart()
│   │       ├── CartDrawer.tsx          # Real-time cart calculations & promo code engine
│   │       ├── LiveContextInspector.tsx# Floating real-time inspector for all 3 contexts
│   │       └── CapstoneStoreDemo.tsx   # Master store tying all hooks & contexts together
│   ├── context/
│   │   ├── ThemeContext.tsx            # Theme state + useTheme hook with guard clause
│   │   ├── AuthContext.tsx             # User role & session state + useAuth hook
│   │   └── CartContext.tsx             # Cart items, derived totals, promo codes + useCart hook
│   ├── hooks/
│   │   ├── useToggle.ts                # Boolean toggle hook with named helper methods
│   │   ├── useLocalStorage.ts          # Persistent state synced with browser storage
│   │   ├── useCounter.ts               # Clamped counter with min/max bounds and step
│   │   └── useDebounce.ts              # Input debouncer with useEffect timer cleanup
│   ├── components/
│   │   ├── ui/                         # Reusable Badge, Button, Card, CodeBlock components
│   │   └── Navigation.tsx              # Top navigation bar with theme toggle
│   ├── data/
│   │   ├── lessons.ts                  # Lesson metadata and curriculum outline
│   │   └── mockData.ts                 # Sample store products and courses
│   ├── types/
│   │   └── index.ts                    # TypeScript definitions
│   ├── App.tsx                         # Main app switcher (starts on Step-by-Step Guide)
│   ├── main.tsx                        # React DOM entry point
│   └── index.css                       # Tailwind CSS styling
└── package.json
```

---

## 🗺️ How to Learn from This Repo

1. **Start on the Step-by-Step Guide:** When you run `pnpm dev`, you'll start on the **🌱 Step-by-Step Guide**. Use the "Next Step" buttons to walk through each concept with live interactive feedback.
2. **Dive into individual lessons:** Once comfortable, use the top bar to explore the deep dives:
   - In **Lesson 1**, see how prop drilling bloats component interfaces.
   - In **Lesson 2**, see the Radio Broadcaster transmitter and receiver components.
   - In **Lesson 3**, test what happens when you deliberately break a custom hook outside its provider.
   - In **Lesson 4**, explore 4 standalone custom hooks (`useToggle`, `useLocalStorage`, `useCounter`, `useDebounce`).
   - In **Lesson 5**, explore the full E-Commerce Store with the live floating state inspector!
3. **Read the source code:** Files in `src/context/` and `src/hooks/` are annotated with beginner notes.
4. **Complete the exercises:** Open **[EXERCISES.md](./EXERCISES.md)** to practice what you learned.

---

## 📖 Additional Resources

- 👶 **[STEP_BY_STEP_GUIDE.md](./STEP_BY_STEP_GUIDE.md)** — The 10-chapter written beginner handbook.
- 📋 **[MENTEE_CHEATSHEET.md](./MENTEE_CHEATSHEET.md)** — 1-page quick syntax reference card.
- 🏋️ **[EXERCISES.md](./EXERCISES.md)** — 5 progressive challenges with solutions.
- 🌐 [Official React Docs: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- 🌐 [Official React Docs: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
