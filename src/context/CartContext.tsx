import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, CartContextType } from '../types';

/**
 * 🎓 LESSON: Action Handlers & Derived State in Context
 * ----------------------------------------------------
 * A great Context does more than just hold static data — it provides clean,
 * easy-to-use "action functions" (like `addToCart`, `updateQuantity`, `applyPromoCode`)
 * so that consumer components don't have to write complex state logic themselves!
 * 
 * 💡 KEY CONCEPT: Derived State
 * Notice we do NOT store `totalPrice` or `itemCount` in state!
 * They are calculated directly from `items` on every render.
 * Rule of thumb: If a value can be computed from existing state, do NOT put it in state!
 */

export const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  REACT2026: 0.25, // 25% off
  STUDENT50: 0.5,  // 50% off
  SHIERA10: 0.1,   // 10% off
};

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Load saved cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('app_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.warn('Failed to load cart from localStorage', e);
      }
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);

  // Sync cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_cart', JSON.stringify(items));
    }
  }, [items]);

  // Actions
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setPromoCode(normalized);
      return {
        success: true,
        message: `Success! Applied ${PROMO_CODES[normalized] * 100}% discount code "${normalized}".`,
      };
    }
    return {
      success: false,
      message: `Invalid promo code. Try "REACT2026" or "STUDENT50".`,
    };
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  // Derived calculations (Computed automatically without extra state)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountRate = promoCode ? PROMO_CODES[promoCode] || 0 : 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    discount,
    total,
    promoCode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom Hook: useCart
 * Provides cart data and actions with a guard clause.
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      '🚨 [useCart Hook Error]: useCart must be used within a <CartProvider>! ' +
      'Please wrap your component tree with <CartProvider>.'
    );
  }

  return context;
}
