import type { LessonInfo } from '../types';

export const LESSONS: LessonInfo[] = [
  {
    id: '00-beginner-guide',
    title: 'Beginner Step-by-Step Guide',
    shortTitle: '🌱 Step-by-Step Guide',
    tagline: 'The gentlest introduction to Context & Custom Hooks',
    icon: '🌱',
    difficulty: 'Beginner',
  },
  {
    id: '01-prop-drilling',
    title: 'Lesson 1: The Prop Drilling Problem',
    shortTitle: '1. Prop Drilling',
    tagline: 'Why passing props through 5 levels hurts',
    icon: '🪵',
    difficulty: 'Beginner',
  },
  {
    id: '02-context-basics',
    title: 'Lesson 2: Context API 3-Step Formula',
    shortTitle: '2. Context 101',
    tagline: 'createContext, Provider & useContext',
    icon: '📻',
    difficulty: 'Beginner',
  },
  {
    id: '03-custom-hooks-context',
    title: 'Lesson 3: The Custom Hook Pattern for Context',
    shortTitle: '3. Hook + Context',
    tagline: 'Encapsulation & the Guard Clause pattern',
    icon: '🛡️',
    difficulty: 'Beginner+',
  },
  {
    id: '04-standalone-hooks',
    title: 'Lesson 4: Standalone Custom Hooks',
    shortTitle: '4. Custom Hooks',
    tagline: 'useToggle, useLocalStorage, useCounter',
    icon: '🪝',
    difficulty: 'Beginner+',
  },
  {
    id: '05-capstone-store',
    title: 'Lesson 5: Capstone Project (Full Store)',
    shortTitle: '5. Capstone Store',
    tagline: 'Theme + Auth + Cart working in harmony',
    icon: '🛍️',
    difficulty: 'Intermediate',
  },
];
