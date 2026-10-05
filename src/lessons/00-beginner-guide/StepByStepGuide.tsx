import { useState, createContext, useContext } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { useToggle } from '../../hooks/useToggle';

// =========================================================================
// MINI CONTEXTS FOR LIVE INLINE DEMOS
// =========================================================================

// For Step 5: Basic Consumer
const SimpleColorContext = createContext<string>('crimson');

// For Step 6: Dynamic Context with Setter
interface InteractiveThemeContextType {
  color: string;
  setColor: (color: string) => void;
}
const InteractiveColorContext = createContext<InteractiveThemeContextType | undefined>(undefined);

function DeepChildConsumer() {
  const color = useContext(SimpleColorContext);
  return (
    <div
      className="p-4 rounded-xl text-white font-bold text-center text-sm shadow-md transition-all"
      style={{ backgroundColor: color }}
    >
      🎉 I am &lt;DeepChild /&gt;! My background color is "{color}" received directly via Context!
    </div>
  );
}

function DeepChildWithButton() {
  const context = useContext(InteractiveColorContext);
  if (!context) return null;
  const { color, setColor } = context;

  const colors = ['#4f46e5', '#059669', '#d97706', '#dc2626', '#9333ea'];

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          I am a Deep Child Component!
        </span>
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white"
          style={{ backgroundColor: color }}
        >
          {color}
        </span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        I can change the entire app's color by calling <code>setColor()</code> provided by Context!
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="w-7 h-7 rounded-full border-2 border-white shadow-sm cursor-pointer transition-transform hover:scale-110"
            style={{ backgroundColor: c }}
            title={`Set color to ${c}`}
          />
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// STEP-BY-STEP GUIDE COMPONENT
// =========================================================================

export function StepByStepGuide() {
  const [currentStep, setCurrentStep] = useState(1);

  // States for live step demos
  const [step1Note, setStep1Note] = useState('Secret Message: React is awesome!');
  const [step5Color, setStep5Color] = useState('#4f46e5');
  const [step6Color, setStep6Color] = useState('#059669');

  // Quiz states for Step 9
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | null>>({
    1: null,
    2: null,
    3: null,
  });

  const TOTAL_STEPS = 9;

  const stepsList = [
    { number: 1, title: 'The Problem: Prop Drilling', icon: '🪵' },
    { number: 2, title: 'The Solution: What is Context?', icon: '💡' },
    { number: 3, title: 'Step 1 of 3: createContext()', icon: '📋' },
    { number: 4, title: 'Step 2 of 3: <Context.Provider>', icon: '📡' },
    { number: 5, title: 'Step 3 of 3: useContext()', icon: '📻' },
    { number: 6, title: 'Updating Context from a Child', icon: '⚡' },
    { number: 7, title: 'Custom Hooks 101', icon: '🪝' },
    { number: 8, title: 'The Golden Pair (Context + Hook)', icon: '🛡️' },
    { number: 9, title: 'Toolkit Summary & Quick Quiz', icon: '🎓' },
  ];

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🌱</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Absolute Beginner Tutorial
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A Beginner's Step-by-Step Guide
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              No confusing jargon. Just plain English, real-world analogies, and bite-sized interactive examples.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-5 pb-1 scrollbar-none border-t border-slate-200/60 dark:border-slate-800/60 mt-4">
          {stepsList.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <span>{step.icon}</span>
                <span>{step.number}. {step.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: THE PROBLEM (PROP DRILLING) */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="rose" size="md">Step 1 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                The Problem: "Prop Drilling" (The Whisper Game)
              </h3>
            </div>
            <span className="text-3xl">🪵</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>🎈 Plain English Analogy:</strong> Imagine 4 students sitting in a line in a classroom:
            <strong> Student A</strong>, <strong>Student B</strong>, <strong>Student C</strong>, and <strong>Student D</strong>.<br />
            Student A wants to pass a note to Student D. Student B and Student C don't care about the note at all, but they have to stop what they are doing, take the note, and pass it along.
            In React, this annoying passing of props is called <strong>Prop Drilling</strong>!
          </div>

          {/* Interactive Simulation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Simulation:
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={step1Note}
                onChange={(e) => setStep1Note(e.target.value)}
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Type a message to pass down..."
              />
            </div>

            {/* Visual chain */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg border-2 border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30">
                <div className="font-bold text-indigo-700 dark:text-indigo-300">Level 1: Grandparent</div>
                <div className="text-[11px] text-slate-500 mt-1">Creates state: "{step1Note}"</div>
              </div>
              <div className="p-3 rounded-lg border border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="font-bold text-amber-700 dark:text-amber-300">Level 2: Parent</div>
                <div className="text-[11px] text-slate-500 mt-1">⚠️ Doesn't need it, just passes it</div>
              </div>
              <div className="p-3 rounded-lg border border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="font-bold text-amber-700 dark:text-amber-300">Level 3: Child</div>
                <div className="text-[11px] text-slate-500 mt-1">⚠️ Still doesn't care, just passes it</div>
              </div>
              <div className="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30">
                <div className="font-bold text-emerald-700 dark:text-emerald-300">Level 4: Grandchild</div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-1 font-semibold">
                  🎯 Finally displays: "{step1Note}"
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// ❌ What Prop Drilling looks like in real code:
function Grandparent() {
  const [theme, setTheme] = useState("dark");
  return <Parent theme={theme} />;       // Passes to Parent
}

function Parent({ theme }) {
  return <Child theme={theme} />;        // Passes to Child
}

function Child({ theme }) {
  return <Grandchild theme={theme} />;   // Passes to Grandchild
}

function Grandchild({ theme }) {
  return <button className={theme}>Click Me</button>; // Finally used!
}`}
            language="tsx"
            filename="TheProblem.tsx"
            note="Notice how Parent and Child are forced to take 'theme' as a prop even though they never use it!"
          />
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: WHAT IS CONTEXT? */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="blue" size="md">Step 2 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                The Solution: What is Context? (The Bulletin Board)
              </h3>
            </div>
            <span className="text-3xl">💡</span>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
            <strong>📌 The Bulletin Board Metaphor:</strong> Instead of passing a secret paper note through 4 people,
            what if we simply pinned the note to a <strong>bulletin board</strong> at the front of the classroom?
            Now, anyone in the room who wants to read it can just glance at the board!
            No one in between has to touch it. That bulletin board is <strong>React Context</strong>.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
              <span className="text-lg">1️⃣</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">createContext()</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You buy the bulletin board and hang it on the wall.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
              <span className="text-lg">2️⃣</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">&lt;Context.Provider&gt;</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You pin the note to the board using the <code>value</code> prop.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1">
              <span className="text-lg">3️⃣</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">useContext()</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Any student looks at the board and reads the note.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-emerald-400/50 bg-emerald-50/30 dark:bg-emerald-950/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-300">
              ✨ The Big Win with Context:
            </div>
            <p>
              Data is <strong>teleported directly</strong> to the exact component that needs it.
              Intermediate components (Level 2 and Level 3) remain 100% clean and unaware!
            </p>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: STEP 1 OF 3 (createContext) */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="purple" size="md">Step 3 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Context Step 1 of 3: <code>createContext()</code>
              </h3>
            </div>
            <span className="text-3xl">📋</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              To create a new Context, you call React's built-in <code>createContext()</code> function.
              You usually do this <strong>outside</strong> of your components (at the top of the file):
            </p>
          </div>

          <CodeBlock
            code={`// Step 1: Create the Context outside your components
import { createContext } from 'react';

// 'light' is the fallback default value
export const ThemeContext = createContext('light');`}
            language="tsx"
            filename="ThemeContext.ts"
            note="Always create Context outside of your components! If you create it inside a component, a brand new context is created every time the component renders!"
          />

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">
              ❓ What is that parameter <code>'light'</code> inside <code>createContext('light')</code>?
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              It is the <strong>default value</strong>. It is ONLY used if a component calls <code>useContext(ThemeContext)</code> but there is NO <code>&lt;ThemeContext.Provider&gt;</code> anywhere above it in the component tree!
            </p>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: STEP 2 OF 3 (Context.Provider) */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="purple" size="md">Step 4 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Context Step 2 of 3: <code>&lt;Context.Provider&gt;</code>
              </h3>
            </div>
            <span className="text-3xl">📡</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              Once you have created <code>ThemeContext</code>, React gives you a special component called{' '}
              <code>&lt;ThemeContext.Provider&gt;</code>.
            </p>
            <p>
              You wrap your component tree with this Provider, and pass the data you want to share into the{' '}
              <strong><code>value</code></strong> prop!
            </p>
          </div>

          <CodeBlock
            code={`import { ThemeContext } from './ThemeContext';

export function App() {
  return (
    // 📡 1. Wrap your tree with the Provider
    // 🎁 2. Pass the data into the 'value' prop
    <ThemeContext.Provider value="dark">
      <Navbar />        {/* No theme prop passed! */}
      <MainContent />   {/* No theme prop passed! */}
    </ThemeContext.Provider>
  );
}`}
            language="tsx"
            filename="App.tsx"
            note="Any component inside <ThemeContext.Provider> can now read 'dark', no matter how deep it is!"
          />

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-bold">⚠️ Golden Rule of Providers:</div>
            <p>
              The Provider must be placed <strong>ABOVE</strong> the components that want to read the data.
              If a component is outside the Provider, it cannot receive the Provider's value!
            </p>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: STEP 3 OF 3 (useContext) */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="purple" size="md">Step 5 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Context Step 3 of 3: <code>useContext()</code>
              </h3>
            </div>
            <span className="text-3xl">📻</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              Now for the magic! How does a deeply nested child component actually read the value?
              By calling the <strong><code>useContext(ThemeContext)</code></strong> hook!
            </p>
          </div>

          <CodeBlock
            code={`import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function DeepChild() {
  // 📻 Look at the bulletin board and grab the value!
  const theme = useContext(ThemeContext);

  return <div className={theme}>Current theme: {theme}</div>;
}`}
            language="tsx"
            filename="DeepChild.tsx"
            note="useContext() accepts the Context object (ThemeContext) as its only argument and returns the current 'value' from the nearest Provider above it."
          />

          {/* Interactive Live Demo */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Test of the 3-Step Formula:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Change Provider Value:</span>
                <input
                  type="color"
                  value={step5Color}
                  onChange={(e) => setStep5Color(e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer"
                />
              </div>
            </div>

            {/* Provider in action */}
            <SimpleColorContext.Provider value={step5Color}>
              <DeepChildConsumer />
            </SimpleColorContext.Provider>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: UPDATING CONTEXT FROM A CHILD */}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="green" size="md">Step 6 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Updating Context State from a Child Component
              </h3>
            </div>
            <span className="text-3xl">⚡</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              Beginners often ask: <em>"Reading data is nice, but what if a button deep inside the app wants to CHANGE the theme?"</em>
            </p>
            <p>
              <strong>The Secret:</strong> You put a standard <code>useState</code> variable AND its setter function inside an object and pass that object to the Provider's <code>value</code>!
            </p>
          </div>

          <CodeBlock
            code={`// In your Provider component:
function App() {
  const [theme, setTheme] = useState("light");

  // Pass BOTH the state AND the setter function in 'value':
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// In any Deep Child component:
function ThemeToggleButton() {
  // Destructure both the value AND the setter!
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle (Current: {theme})
    </button>
  );
}`}
            language="tsx"
            filename="InteractiveContext.tsx"
            note="Whenever setTheme() is called in ANY child, the Provider updates its state, and every child reading ThemeContext re-renders with the new value automatically!"
          />

          {/* Interactive Live Demo */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Test: Click below to update the Provider state from this child component!
            </h4>
            <InteractiveColorContext.Provider
              value={{ color: step6Color, setColor: setStep6Color }}
            >
              <DeepChildWithButton />
            </InteractiveColorContext.Provider>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 7: CUSTOM HOOKS 101 */}
      {/* ========================================================================= */}
      {currentStep === 7 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="blue" size="md">Step 7 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Custom Hooks 101: What Actually IS a Custom Hook?
              </h3>
            </div>
            <span className="text-3xl">🪝</span>
          </div>

          <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 text-xs sm:text-sm text-violet-900 dark:text-violet-200 leading-relaxed">
            <strong>💡 Demystifying the Buzzword:</strong> Many beginners think Custom Hooks are complicated React magic.
            They are NOT! A Custom Hook is simply a <strong>regular JavaScript function</strong> that:
            <ol className="list-decimal list-inside mt-2 space-y-1 font-semibold">
              <li>Starts with the prefix "use" (like <code>useToggle</code> or <code>useCounter</code>).</li>
              <li>Calls other React hooks (like <code>useState</code> or <code>useEffect</code>).</li>
            </ol>
            That's literally all a custom hook is!
          </div>

          <CodeBlock
            code={`// 🛠️ Building your first custom hook: useToggle.ts
import { useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  // Return the value and the toggle function
  return [value, toggle] as const;
}

// 🎯 How to use it in ANY component:
function Accordion() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>{isOpen ? 'Hide' : 'Show'}</button>
      {isOpen && <p>Here is the hidden secret!</p>}
    </div>
  );
}`}
            language="tsx"
            filename="useToggle.ts"
            note="Instead of repeating 'const [isOpen, setIsOpen] = useState(false)' and creating a toggle function in 20 different files, you reuse useToggle() everywhere!"
          />

          <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Test of useToggle():
            </h4>
            <StandaloneToggleTest />
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 8: THE GOLDEN PAIR (CONTEXT + CUSTOM HOOK) */}
      {/* ========================================================================= */}
      {currentStep === 8 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="purple" size="md">Step 8 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                The Golden Pair: Context + Custom Hook Pattern
              </h3>
            </div>
            <span className="text-3xl">🛡️</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              In professional React codebases, developers almost <strong>never export the raw Context object</strong> directly.
              Instead, they wrap <code>useContext()</code> inside a dedicated custom hook (e.g. <code>useTheme()</code> or <code>useAuth()</code>).
            </p>
            <p>
              Why? Because of <strong>The Guard Clause</strong>!
            </p>
          </div>

          <CodeBlock
            code={`// 🛡️ The Professional Pattern:
export function useTheme() {
  const context = useContext(ThemeContext);

  // 🚨 The Guard Clause: Catch developer mistakes immediately!
  if (!context) {
    throw new Error(
      "🚨 useTheme must be used within a <ThemeProvider>! " +
      "Did you forget to wrap your component tree?"
    );
  }

  return context;
}

// 🎯 In your component: Clean 1-line import!
// import { useTheme } from './ThemeContext';
// const { theme, toggleTheme } = useTheme();`}
            language="tsx"
            filename="useTheme.ts"
            note="If you forget to add <ThemeProvider>, this Guard Clause tells you the exact problem immediately, instead of a confusing 'Cannot read properties of undefined' crash!"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
              <strong className="text-rose-700 dark:text-rose-400 block mb-1">❌ Without Custom Hook</strong>
              Must import <code>useContext</code> AND <code>ThemeContext</code> in every single component. If Provider is missing, crashes silently or mysteriously.
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">✅ With useTheme() Hook</strong>
              Single clean import. The Guard Clause guarantees the return value is 100% safe and typed!
            </div>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* STEP 9: TOOLKIT SUMMARY & MINI QUIZ */}
      {/* ========================================================================= */}
      {currentStep === 9 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge variant="green" size="md">Step 9 of 9</Badge>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                Toolkit Summary & Check Your Understanding!
              </h3>
            </div>
            <span className="text-3xl">🎓</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your 30-Second Mental Formula:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Context API</span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Broadcasts global data down the component tree without passing props through intermediate layers.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-violet-600 dark:text-violet-400">Custom Hooks</span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Reusable JavaScript functions starting with <code>use</code> that package stateful logic so you don't repeat code.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Quiz */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              🧠 Quick Check (3 Questions):
            </h4>

            {/* Question 1 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                1. Where must you place <code>&lt;ThemeContext.Provider&gt;</code>?
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['At the bottom of the tree', 'ABOVE all components that need the data', 'Inside each button'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setQuizAnswers((prev) => ({ ...prev, 1: opt }))}
                    className={`px-3 py-1.5 rounded-lg border cursor-pointer transition ${
                      quizAnswers[1] === opt
                        ? opt.startsWith('ABOVE')
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-rose-600 text-white border-rose-600 font-bold'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[1] && (
                <p className="text-xs text-slate-500 mt-1">
                  {quizAnswers[1].startsWith('ABOVE')
                    ? '✅ Correct! The Provider must wrap all consumers above them.'
                    : '❌ Incorrect. The Provider must be ABOVE the components so its value trickles down.'}
                </p>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                2. What is a Custom Hook in React?
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['A complex React plugin', 'A function starting with "use" that calls other hooks', 'A replacement for HTML tags'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setQuizAnswers((prev) => ({ ...prev, 2: opt }))}
                    className={`px-3 py-1.5 rounded-lg border cursor-pointer transition ${
                      quizAnswers[2] === opt
                        ? opt.startsWith('A function starting with "use"')
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-rose-600 text-white border-rose-600 font-bold'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[2] && (
                <p className="text-xs text-slate-500 mt-1">
                  {quizAnswers[2].startsWith('A function starting with "use"')
                    ? '✅ Correct! Custom hooks are simply functions starting with "use" that call hooks.'
                    : '❌ Incorrect. A custom hook is just a regular JS function starting with "use" that calls hooks!'}
                </p>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                3. What is the purpose of the Guard Clause inside <code>useTheme()</code>?
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['To make the app run faster', 'To throw a helpful error if used outside <ThemeProvider>', 'To prevent dark mode'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setQuizAnswers((prev) => ({ ...prev, 3: opt }))}
                    className={`px-3 py-1.5 rounded-lg border cursor-pointer transition ${
                      quizAnswers[3] === opt
                        ? opt.startsWith('To throw a helpful error')
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-rose-600 text-white border-rose-600 font-bold'
                        : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizAnswers[3] && (
                <p className="text-xs text-slate-500 mt-1">
                  {quizAnswers[3].startsWith('To throw a helpful error')
                    ? '✅ Correct! It prevents undefined crashes and tells the developer where they forgot the Provider.'
                    : '❌ Incorrect. The Guard Clause protects developers by alerting them when the Provider is missing.'}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons: Previous / Next Step */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="outline"
          size="md"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          ← Previous Step
        </Button>

        <span className="text-xs text-slate-400 font-medium">
          Step {currentStep} of {TOTAL_STEPS}
        </span>

        {currentStep < TOTAL_STEPS ? (
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
          >
            Next Step →
          </Button>
        ) : (
          <Button
            variant="success"
            size="md"
            onClick={() => setCurrentStep(1)}
          >
            🎉 Review From Step 1
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper component for live test in Step 7
function StandaloneToggleTest() {
  const [isOn, toggleIsOn] = useToggle(false);

  return (
    <div className="flex items-center gap-3">
      <Button size="sm" onClick={toggleIsOn}>
        Click toggle()
      </Button>
      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
        Switch Status: {isOn ? '🟢 ACTIVE' : '⚪ INACTIVE'}
      </span>
    </div>
  );
}
