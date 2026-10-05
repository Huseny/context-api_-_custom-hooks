import { useState, useCallback } from 'react';

/**
 * 🎓 LESSON: What is a Custom Hook?
 * ---------------------------------
 * A Custom Hook is simply a regular JavaScript/TypeScript function whose name starts
 * with the word "use" (like `useToggle`, `useTheme`, `useLocalStorage`), and that can
 * call other React hooks (`useState`, `useEffect`, `useContext`, etc.).
 * 
 * 💡 WHY USE IT?
 * Instead of repeating `const [isOpen, setIsOpen] = useState(false)` and creating
 * toggle handlers in 20 different components, we extract that reusable logic into
 * this simple custom hook!
 * 
 * 📦 RETURN TYPE:
 * We return a tuple `[value, toggle, setTrue, setFalse]` just like `useState` returns `[state, setState]`.
 * This allows the consumer component to name the variables whatever they want!
 * E.g.: `const [isModalOpen, toggleModal] = useToggle(false);`
 */

export type UseToggleReturn = [
  boolean,
  () => void,
  () => void,
  () => void
];

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  // useCallback memoizes these functions so they don't get recreated on every render
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}
