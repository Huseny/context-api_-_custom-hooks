import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

// Simple Error Boundary component for educational demonstration
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryDemo extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.reset);
    }
    return this.props.children;
  }
}

// Component that correctly uses useTheme
function ProperThemeConsumer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
          ✅ Inside &lt;ThemeProvider&gt;
        </span>
        <Badge variant="green" size="sm">Valid Context</Badge>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
        Current Theme: <span className="font-bold uppercase text-emerald-600 dark:text-emerald-400">{theme}</span>
      </p>
      <Button size="sm" variant="success" onClick={toggleTheme}>
        Toggle Theme via useTheme()
      </Button>
    </div>
  );
}

// Component that will intentionally break if rendered outside the Provider
function BuggyConsumer() {
  const { theme } = useTheme(); // Will throw our guard clause error!
  return <div>Theme: {theme}</div>;
}

export function CustomHookContextDemo() {
  const [testOutsideProvider, setTestOutsideProvider] = useState(false);

  const patternCode = `// 🛡️ THE GUARD CLAUSE PATTERN (Best Practice)
// File: src/context/ThemeContext.tsx

// 1. Create context with 'undefined' default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Wrap inside a custom hook with the guard clause
export function useTheme() {
  const context = useContext(ThemeContext);

  // If component is not inside <ThemeProvider>, context is undefined!
  if (!context) {
    throw new Error(
      "🚨 useTheme must be used within a <ThemeProvider>! " +
      "Did you forget to wrap your tree?"
    );
  }

  // TypeScript now knows context is 100% defined!
  return context;
}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="purple">The Industry Standard</Badge>
          <span className="text-xs text-slate-400">Lesson 3 of 5</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The Custom Hook + Context Pattern
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Why shouldn't you export <code>ThemeContext</code> directly and let components call <code>useContext(ThemeContext)</code>?
          Because wrapping Context in a dedicated <strong>Custom Hook</strong> (like <code>useTheme()</code>) provides
          fail-safe debugging, cleaner imports, and total encapsulation.
        </p>
      </div>

      {/* Comparison: Raw useContext vs Custom Hook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-rose-500 font-bold text-lg">❌</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Raw useContext Pattern (Avoid)
            </h4>
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
            <li>Must import both <code>useContext</code> AND <code>ThemeContext</code> in every consumer file.</li>
            <li>If someone forgets the Provider, it silently fails or returns undefined without a helpful error.</li>
            <li>Exposes raw context object internals to every consumer component.</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-500 font-bold text-lg">✅</span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Custom Hook Pattern (Industry Standard)
            </h4>
          </div>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
            <li>Single clean import: <code>import &#123; useTheme &#125; from './ThemeContext'</code>.</li>
            <li><strong>Guard Clause</strong> throws a crystal-clear error during development if Provider is missing!</li>
            <li>TypeScript automatically knows the return type is never undefined.</li>
          </ul>
        </div>
      </div>

      {/* Interactive Guard Clause Demo */}
      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Guard Clause Test
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test calling <code>useTheme()</code> inside a valid Provider vs outside any Provider!
              </p>
            </div>
            <Button
              variant={testOutsideProvider ? 'outline' : 'danger'}
              size="sm"
              onClick={() => setTestOutsideProvider((prev) => !prev)}
            >
              {testOutsideProvider ? 'Reset Test' : '⚡ Simulate Missing Provider'}
            </Button>
          </div>
        </CardHeader>

        <CardBody className="space-y-4">
          {!testOutsideProvider ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Below, the component is safely wrapped inside <code>&lt;ThemeProvider&gt;</code>:
              </p>
              <ThemeProvider>
                <ProperThemeConsumer />
              </ThemeProvider>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-300">
                <strong>Simulating Developer Mistake:</strong> We are rendering a component that calls <code>useTheme()</code> without any <code>&lt;ThemeProvider&gt;</code> around it!
              </div>

              {/* Catch the simulated hook error with ErrorBoundary */}
              <ErrorBoundaryDemo
                fallback={(error, reset) => (
                  <div className="p-4 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      <span>🛡️ Guard Clause Caught This Error!</span>
                    </div>
                    <p className="font-mono text-xs bg-rose-900/10 dark:bg-rose-900/30 p-2.5 rounded-lg border border-rose-400/30 text-rose-800 dark:text-rose-300">
                      {error.message}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Notice how clear that message is! Instead of a cryptic <code>TypeError: Cannot read properties of undefined</code>, you immediately know you forgot to add the Provider!
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        reset();
                        setTestOutsideProvider(false);
                      }}
                    >
                      Return to Safe Mode
                    </Button>
                  </div>
                )}
              >
                <BuggyConsumer />
              </ErrorBoundaryDemo>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Code Snippet Card */}
      <CodeBlock
        code={patternCode}
        language="tsx"
        filename="ThemeContext.tsx"
        note="Every production React team uses this pattern for contexts (useAuth, useCart, useTheme, etc.). Remember: createContext with undefined + guard clause in custom hook!"
      />
    </div>
  );
}
