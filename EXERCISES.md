# 🏋️ Hands-On Practice Exercises: Context API & Custom Hooks

> Complete these 5 progressive exercises to reinforce your understanding. Each challenge includes **Starter Code**, **Hints**, and **Full Solution Code**.

---

## 🎯 Exercise 1: Build a `useWindowSize` Custom Hook

### 📋 Objective
Create a custom hook named `useWindowSize()` that tracks the browser window dimensions (`width` and `height`) and provides a boolean `isMobile` (true if `width < 768`).

### 💡 Key Concepts
- Using `useState` to store window dimensions.
- Attaching a `window.addEventListener('resize', ...)` inside `useEffect`.
- **Critical:** Returning a cleanup function `() => window.removeEventListener('resize', ...)` to prevent memory leaks!

### 🛠️ Starter Code
```tsx
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

export function useWindowSize(): WindowSize {
  // TODO: Initialize state with current window.innerWidth / window.innerHeight
  // TODO: Add resize event listener in useEffect
  // TODO: Cleanup event listener on unmount
}
```

<details>
<summary>👉 Click to view Full Solution</summary>

```tsx
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Example usage:
// function ResponsiveBanner() {
//   const { isMobile, width } = useWindowSize();
//   return <p>Screen width: {width}px ({isMobile ? 'Mobile View' : 'Desktop View'})</p>;
// }
```
</details>

---

## 🎯 Exercise 2: Build a Toast Notification Context

### 📋 Objective
Build a lightweight toast notification system using Context API and a custom hook `useToast()`. Any component anywhere in the application should be able to trigger a toast message without passing callbacks.

### 💡 Key Concepts
- `createContext` with `ToastContextType | undefined`.
- `ToastProvider` maintaining an array of active toasts.
- Auto-dismissing toasts after 3 seconds using `setTimeout`.
- Custom hook `useToast()` with a Guard Clause.

### 🛠️ Starter Code
```tsx
import React, { createContext, useContext, useState } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

// TODO: Create ToastContext
// TODO: Create ToastProvider
// TODO: Create useToast custom hook with guard clause
```

<details>
<summary>👉 Click to view Full Solution</summary>

```tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info') => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      // Auto dismiss after 3 seconds
      setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold text-white ${
              toast.type === 'success'
                ? 'bg-emerald-600'
                : toast.type === 'error'
                ? 'bg-rose-600'
                : 'bg-indigo-600'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>!');
  }
  return context;
}
```
</details>

---

## 🎯 Exercise 3: Build a `useFavorites` Hook with `useLocalStorage`

### 📋 Objective
Create a custom hook `useFavorites()` that allows users to toggle product IDs into a "Favorites / Wishlist" list. The favorites must persist across browser refreshes!

### 💡 Key Concepts
- Composing one custom hook inside another (`useFavorites` calls `useLocalStorage`).
- Adding/removing items from an array based on presence (`includes`).

<details>
<summary>👉 Click to view Full Solution</summary>

```tsx
import { useCallback } from 'react';
import { useLocalStorage } from './src/hooks/useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('user_favorites', []);

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, count: favorites.length };
}
```
</details>

---

## 🎯 Exercise 4: Multi-Step Form Wizard with `FormContext`

### 📋 Objective
Build a multi-step form wizard (Step 1: Account, Step 2: Shipping, Step 3: Confirmation) where form data is preserved across steps without passing massive state down each step component.

### 💡 Key Concepts
- Holding form data object `{ username, email, address, zip }` in Context state.
- Step management (`currentStep`, `nextStep`, `prevStep`).
- Updating individual fields with `updateField(name, value)`.

<details>
<summary>👉 Click to view Full Solution</summary>

```tsx
import React, { createContext, useContext, useState } from 'react';

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
}

interface FormContextType {
  step: number;
  data: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormWizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <FormContext.Provider
      value={{
        step,
        data,
        updateField,
        nextStep,
        prevStep,
        isFirstStep: step === 1,
        isLastStep: step === 3,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormWizard() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormWizard must be used within <FormWizardProvider>!');
  }
  return context;
}
```
</details>

---

## 🎯 Exercise 5: Add Currency Switcher Context to Capstone Store

### 📋 Objective
Create a `CurrencyContext` with exchange rates for `USD ($1.00)`, `EUR (€0.92)`, and `GBP (£0.78)`.
Provide a helper function `formatPrice(usdAmount: number): string` that formats the price according to the active currency!

<details>
<summary>👉 Click to view Full Solution</summary>

```tsx
import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
}

const RATES: Record<Currency, { rate: number; symbol: string }> = {
  USD: { rate: 1.0, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.78, symbol: '£' },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (amountInUSD: number): string => {
    const config = RATES[currency];
    const converted = amountInUSD * config.rate;
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within <CurrencyProvider>!');
  }
  return context;
}
```
</details>
