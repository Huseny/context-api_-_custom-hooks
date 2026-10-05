import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { StepByStepGuide } from './lessons/00-beginner-guide/StepByStepGuide';
import { PropDrillingDemo } from './lessons/01-prop-drilling/PropDrillingDemo';
import { ContextBasicsDemo } from './lessons/02-context-basics/ContextBasicsDemo';
import { CustomHookContextDemo } from './lessons/03-custom-hooks-with-context/CustomHookContextDemo';
import { StandaloneHooksDemo } from './lessons/04-standalone-hooks/StandaloneHooksDemo';
import { CapstoneStoreDemo } from './lessons/05-capstone-store/CapstoneStoreDemo';
import type { LessonId } from './types';

export function App() {
  // Default to the step-by-step beginner guide so learners start in comfort!
  const [currentLesson, setCurrentLesson] = useState<LessonId>('00-beginner-guide');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        {/* Sticky Header with Navigation and Theme Toggle */}
        <Navigation
          currentLesson={currentLesson}
          onSelectLesson={setCurrentLesson}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {currentLesson === '00-beginner-guide' && <StepByStepGuide />}
          {currentLesson === '01-prop-drilling' && <PropDrillingDemo />}
          {currentLesson === '02-context-basics' && <ContextBasicsDemo />}
          {currentLesson === '03-custom-hooks-context' && <CustomHookContextDemo />}
          {currentLesson === '04-standalone-hooks' && <StandaloneHooksDemo />}
          {currentLesson === '05-capstone-store' && <CapstoneStoreDemo />}
        </main>

        {/* Footer with Quick Navigation and Documentation Links */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                React Context API & Custom Hooks Masterclass
              </p>
              <p className="mt-0.5">
                Built for beginners & mentees • Explore the code in <code>src/</code>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="text-slate-400">Jump to documentation:</span>
              <a
                href="#guide"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentLesson('00-beginner-guide');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Step-by-Step Guide
              </a>
              <span>•</span>
              <a
                href="#readme"
                onClick={(e) => {
                  e.preventDefault();
                  alert('📘 Check out README.md and STEP_BY_STEP_GUIDE.md in the root directory!');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                README.md
              </a>
              <span>•</span>
              <a
                href="#cheatsheet"
                onClick={(e) => {
                  e.preventDefault();
                  alert('📋 Check out MENTEE_CHEATSHEET.md in the root directory for quick syntax templates!');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Cheatsheet
              </a>
              <span>•</span>
              <a
                href="#exercises"
                onClick={(e) => {
                  e.preventDefault();
                  alert('🏋️ Check out EXERCISES.md in the root directory for hands-on practice!');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Exercises
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
