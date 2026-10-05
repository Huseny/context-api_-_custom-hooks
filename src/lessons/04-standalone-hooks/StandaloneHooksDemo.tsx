import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { useToggle } from '../../hooks/useToggle';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCounter } from '../../hooks/useCounter';
import { useDebounce } from '../../hooks/useDebounce';

// Tab 1: useToggle Playground
function TogglePlayground() {
  const [isOpen, toggleOpen, setOpen, setClosed] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Example 1: Modal / Accordion Toggle
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={toggleOpen}>
            toggle()
          </Button>
          <Button size="sm" variant="outline" onClick={setOpen}>
            setTrue() (Open)
          </Button>
          <Button size="sm" variant="outline" onClick={setClosed}>
            setFalse() (Close)
          </Button>
          <Badge variant={isOpen ? 'green' : 'slate'} size="md">
            Status: {isOpen ? 'OPEN' : 'CLOSED'}
          </Badge>
        </div>

        {isOpen && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs text-indigo-900 dark:text-indigo-200 transition-all">
            🎉 <strong>Toggled Content Visible!</strong> You can reuse <code>useToggle()</code> for dropdowns, modals, FAQs, and mobile menus!
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Example 2: Fast Feature Switch
        </h4>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
              isDarkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Switch Value: {isDarkMode ? 'Active (true)' : 'Inactive (false)'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Tab 2: useLocalStorage Playground
function LocalStoragePlayground() {
  const [savedNote, setSavedNote, clearNote] = useLocalStorage<string>(
    'beginner_demo_note',
    'Edit this note and refresh the browser!'
  );

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          State Synced with Browser's localStorage
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Anything you type into the box below automatically saves to <code>window.localStorage['beginner_demo_note']</code>.
        </p>
      </div>

      <textarea
        value={savedNote}
        onChange={(e) => setSavedNote(e.target.value)}
        rows={3}
        className="w-full text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
        placeholder="Type something here..."
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          Stored Key: <span className="text-indigo-600 dark:text-indigo-400">"beginner_demo_note"</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={clearNote}>
            Clear Storage
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh Page to Test
          </Button>
        </div>
      </div>
    </div>
  );
}

// Tab 3: useCounter Playground
function CounterPlayground() {
  const { count, increment, decrement, reset, isMin, isMax } = useCounter(1, {
    min: 1,
    max: 10,
    step: 1,
  });

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Clamped Counter (Min: 1, Max: 10, Step: 1)
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The business rules (cannot go below 1 or above 10) are baked right inside the hook!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={decrement}
          disabled={isMin}
        >
          -
        </Button>
        <span className="w-12 text-center text-lg font-bold text-slate-900 dark:text-white font-mono">
          {count}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={increment}
          disabled={isMax}
        >
          +
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {isMin && <Badge variant="amber" size="sm">Reached Minimum (1)</Badge>}
        {isMax && <Badge variant="rose" size="sm">Reached Maximum (10)</Badge>}
      </div>
    </div>
  );
}

// Tab 4: useDebounce Playground
function DebouncePlayground() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          Search Keystroke Debouncer (500ms delay)
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Type quickly in the search box. The immediate value updates on every single keystroke, but the debounced value only updates after you pause for 500ms!
        </p>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type rapidly here..."
        className="w-full text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 block mb-1">⚡ Instant State (Every Key):</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            "{searchTerm || 'empty'}"
          </span>
        </div>

        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
          <span className="text-indigo-600 dark:text-indigo-400 block mb-1">⏳ Debounced Query (After 500ms):</span>
          <span className="font-mono font-bold text-indigo-900 dark:text-indigo-200">
            "{debouncedSearch || 'empty'}"
          </span>
        </div>
      </div>
    </div>
  );
}

export function StandaloneHooksDemo() {
  const [activeTab, setActiveTab] = useState<'toggle' | 'storage' | 'counter' | 'debounce'>('toggle');

  const hookCode = `// 🪝 WHAT IS A CUSTOM HOOK?
// Just a regular JavaScript function that:
// 1. Starts with "use" (e.g. useToggle, useCounter)
// 2. Can call other React hooks (useState, useEffect, etc.)

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}

// In your component:
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);
  return <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>;
}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="blue">Pure Stateful Logic</Badge>
          <span className="text-xs text-slate-400">Lesson 4 of 5</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Standalone Custom Hooks (Beyond Context!)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          A common beginner misconception is that Custom Hooks <em>only</em> exist to consume Context.
          In reality, <strong>Custom Hooks are the primary way in React to extract and reuse stateful logic</strong> across any component!
        </p>
      </div>

      {/* The 2 Golden Rules of Hooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500 font-bold text-lg">⚠️ Rule 1</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Only Call at the Top Level
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Never call hooks inside loops, conditional statements (<code>if/else</code>), or nested functions.
            React relies on the order hooks are called to preserve state between renders!
          </p>
        </div>

        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500 font-bold text-lg">⚠️ Rule 2</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Only Call from React Functions
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Only call hooks from React function components or from other custom hooks (functions starting with <code>use</code>). Don't call them from plain vanilla JS utility functions.
          </p>
        </div>
      </div>

      {/* Interactive Hooks Playground */}
      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Custom Hook Lab
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore 4 essential custom hook recipes every React developer should have in their toolkit.
              </p>
            </div>
            {/* Tab switchers */}
            <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('toggle')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                  activeTab === 'toggle'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                useToggle
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                  activeTab === 'storage'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                useLocalStorage
              </button>
              <button
                onClick={() => setActiveTab('counter')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                  activeTab === 'counter'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                useCounter
              </button>
              <button
                onClick={() => setActiveTab('debounce')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                  activeTab === 'debounce'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                useDebounce
              </button>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          {activeTab === 'toggle' && <TogglePlayground />}
          {activeTab === 'storage' && <LocalStoragePlayground />}
          {activeTab === 'counter' && <CounterPlayground />}
          {activeTab === 'debounce' && <DebouncePlayground />}
        </CardBody>
      </Card>

      {/* Code Snippet */}
      <CodeBlock
        code={hookCode}
        language="tsx"
        filename="useToggle.ts"
        note="Whenever you find yourself writing the exact same useState logic in 3 different components, extract it into a custom hook!"
      />
    </div>
  );
}
