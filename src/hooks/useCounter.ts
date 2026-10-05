import { useState, useCallback } from 'react';

/**
 * 🎓 LESSON: Encapsulating Business Logic inside Custom Hooks
 * -----------------------------------------------------------
 * Sometimes state has specific business rules (e.g., "The item quantity cannot be negative"
 * or "The maximum cart count per customer is 10").
 * 
 * Instead of writing `if (count + 1 <= max)` checks inside button click handlers in your UI,
 * you can bake those boundary constraints directly into a reusable `useCounter` hook!
 */

export interface CounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
  isMin: boolean;
  isMax: boolean;
}

export function useCounter(
  initialValue = 0,
  options: CounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity, step = 1 } = options;

  // Ensure initial value respects the bounds
  const clampedInitial = Math.min(Math.max(initialValue, min), max);
  const [count, setCountState] = useState<number>(clampedInitial);

  const increment = useCallback(() => {
    setCountState((prev) => Math.min(prev + step, max));
  }, [step, max]);

  const decrement = useCallback(() => {
    setCountState((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const reset = useCallback(() => {
    setCountState(clampedInitial);
  }, [clampedInitial]);

  const setCount = useCallback(
    (val: number) => {
      setCountState(Math.min(Math.max(val, min), max));
    },
    [min, max]
  );

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
    isMin: count <= min,
    isMax: count >= max,
  };
}
