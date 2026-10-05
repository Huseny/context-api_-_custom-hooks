import { useState, useEffect } from 'react';

/**
 * 🎓 LESSON: Combining useState & Browser APIs in a Custom Hook
 * -------------------------------------------------------------
 * React state is stored in memory, which means when a user refreshes the page,
 * regular state resets back to the initial value.
 * 
 * By combining `useState` with the browser's `window.localStorage`, we can create
 * persistent state that survives page refreshes!
 * 
 * 💡 KEY BEGINNER TAKEAWAY:
 * Notice the callback inside `useState(() => ...)`! This is called "lazy initialization".
 * Reading from `localStorage` can be slow, so passing a function to `useState` ensures
 * `localStorage.getItem` is only executed ONCE on the initial mount, NOT on every render!
 */

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 1. Initialize state lazily from localStorage or fall back to initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Synchronize localStorage whenever storedValue changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Error saving key "${key}":`, error);
    }
  }, [key, storedValue]);

  // 3. Helper to remove item from localStorage and reset to initialValue
  const removeItem = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`[useLocalStorage] Error removing key "${key}":`, error);
    }
  };

  return [storedValue, setStoredValue, removeItem];
}
