import { useState, useEffect } from 'react';

/**
 * 🎓 LESSON: useEffect Cleanup in Custom Hooks (useDebounce)
 * ---------------------------------------------------------
 * When a user types into a live search input, they might trigger 10 keystrokes in 1 second.
 * Searching an API or filtering 10,000 items on every single keystroke causes lag!
 * 
 * "Debouncing" delays the update until the user has stopped typing for a specific delay (e.g. 300ms).
 * 
 * 💡 KEY BEGINNER TAKEAWAY:
 * Notice the cleanup function returned by `useEffect`:
 * `return () => clearTimeout(timer);`
 * Every time the user types a new character before the delay expires, React calls the cleanup function,
 * cancelling the previous timer! Only the final keystroke triggers the update.
 */

export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after delayMs
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // React calls this cleanup function if `value` or `delayMs` changes before the timer fires!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
