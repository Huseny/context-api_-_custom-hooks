import React, { createContext, useContext, useState } from 'react';
import type { User, UserRole, AuthContextType } from '../types';

/**
 * 🎓 LESSON: User Authentication with Context API
 * -----------------------------------------------
 * User authentication is the classic real-world use case for React Context!
 * Almost every part of an app needs to know:
 * - Is someone logged in?
 * - What is their name and avatar?
 * - Are they an Admin or a Student?
 * 
 * Passing `user` through props to every single header, sidebar, profile button,
 * and page would be exhausting. Context allows ANY component to say `useAuth()`
 * and immediately know who the current user is.
 */

const DEMO_USERS: Record<UserRole, User> = {
  guest: {
    id: 'usr_guest',
    name: 'Guest Learner',
    email: 'guest@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'guest',
    enrolledCourse: 'Free React Preview',
  },
  student: {
    id: 'usr_student',
    name: 'Alex Rivera',
    email: 'alex.rivera@devbootcamp.io',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    enrolledCourse: 'Modern React & TypeScript Mastery',
  },
  mentor: {
    id: 'usr_mentor',
    name: 'Sarah Chen',
    email: 'sarah.mentor@codeacademy.dev',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'mentor',
    enrolledCourse: 'Instructor Team',
  },
  admin: {
    id: 'usr_admin',
    name: 'Husen (Lead Architect)',
    email: 'husen.admin@shiera.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    enrolledCourse: 'Full Platform Access',
  },
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialRole?: UserRole;
}

export function AuthProvider({
  children,
  initialRole = 'student',
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(DEMO_USERS[initialRole]);

  const login = (role: UserRole = 'student') => {
    setUser(DEMO_USERS[role] || DEMO_USERS.student);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null && user.role !== 'guest',
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom Hook: useAuth
 * Provides access to the auth context with a safety guard clause.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      '🚨 [useAuth Hook Error]: useAuth must be used within an <AuthProvider>! ' +
      'Check that your component is rendered inside <AuthProvider>.'
    );
  }

  return context;
}
