/**
 * Core Type Definitions for the Context API & Custom Hooks Learning Suite.
 * 
 * Beginners: Types in TypeScript act as a "contract" that describes the shape of
 * your data. When building Contexts and Custom Hooks, having clean types makes
 * auto-complete and error prevention effortless!
 */

// ==========================================
// 1. Theme Types
// ==========================================
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ==========================================
// 2. Authentication & User Types
// ==========================================
export type UserRole = 'guest' | 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  enrolledCourse: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role?: UserRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// ==========================================
// 3. E-Commerce / Store Types (Capstone)
// ==========================================
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'books' | 'courses' | 'swag' | 'tools';
  description: string;
  image: string;
  rating: number;
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

// ==========================================
// 4. Learning Navigation Types
// ==========================================
export type LessonId =
  | '00-beginner-guide'
  | '01-prop-drilling'
  | '02-context-basics'
  | '03-custom-hooks-context'
  | '04-standalone-hooks'
  | '05-capstone-store';

export interface LessonInfo {
  id: LessonId;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: string;
  difficulty: 'Beginner' | 'Beginner+' | 'Intermediate';
}
