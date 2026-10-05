import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CodeBlock } from '../../components/ui/CodeBlock';

// =========================================================================
// SIMULATED PROP-DRILLED COMPONENTS
// Notice how every single component below must receive `user` & `theme`
// just to pass it down to `DeepChildProfile`!
// =========================================================================

interface ChildProps {
  user: { name: string; role: string; avatar: string };
  theme: 'light' | 'dark';
  onUpdateName: (name: string) => void;
}

// Level 2 Component: App passes to Dashboard
function Dashboard({ user, theme, onUpdateName }: ChildProps) {
  return (
    <div className="p-4 rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/20">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300">
          Level 2: &lt;Dashboard&gt;
        </span>
        <Badge variant="amber" size="sm">⚠️ Prop Passenger (Does not use data)</Badge>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        "I don't need the user info, but my child component does, so I must take it and pass it down!"
      </p>
      <MainContent user={user} theme={theme} onUpdateName={onUpdateName} />
    </div>
  );
}

// Level 3 Component: Dashboard passes to MainContent
function MainContent({ user, theme, onUpdateName }: ChildProps) {
  return (
    <div className="p-4 rounded-xl border-2 border-dashed border-orange-300 dark:border-orange-700/60 bg-orange-50/50 dark:bg-orange-950/20">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-orange-800 dark:text-orange-300">
          Level 3: &lt;MainContent&gt;
        </span>
        <Badge variant="amber" size="sm">⚠️ Prop Passenger (Does not use data)</Badge>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        "I also don't care about the user. I'm just a middleman courier passing props down the chain."
      </p>
      <DeepChildProfile user={user} theme={theme} onUpdateName={onUpdateName} />
    </div>
  );
}

// Level 4 Component: Finally the target that actually uses the data!
function DeepChildProfile({ user, theme, onUpdateName }: ChildProps) {
  return (
    <div className="p-4 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Level 4: &lt;DeepChildProfile&gt;
        </span>
        <Badge variant="green" size="sm">🎯 Actual Consumer (Finally!)</Badge>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full border-2 border-emerald-500"
        />
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {user.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Role: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.role}</span> | Theme: {theme}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={user.name}
          onChange={(e) => onUpdateName(e.target.value)}
          placeholder="Edit name to see callback drill up..."
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}

export function PropDrillingDemo() {
  const [userName, setUserName] = useState('Alex Rivera');
  const [userRole, setUserRole] = useState('Student');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const user = {
    name: userName,
    role: userRole,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  };

  const codeExample = `// ❌ THE PAIN OF PROP DRILLING:
// Component A has the state:
function Grandparent() {
  const [user, setUser] = useState({ name: "Alex" });
  return <Parent user={user} setUser={setUser} />;
}

// Component B doesn't care about 'user', but must accept it:
function Parent({ user, setUser }) {
  return <Child user={user} setUser={setUser} />;
}

// Component C doesn't care either:
function Child({ user, setUser }) {
  return <Grandchild user={user} setUser={setUser} />;
}

// Component D finally uses it:
function Grandchild({ user, setUser }) {
  return <h1>Hello, {user.name}!</h1>;
}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="rose">The Problem We Are Solving</Badge>
          <span className="text-xs text-slate-400">Lesson 1 of 5</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What is "Prop Drilling" and Why Does It Hurt?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          In React, data flows <strong>downwards</strong> from parent to child via props.
          When a deeply nested component needs data from the top, you are forced to pass that data through
          every single component in between — even if those intermediate components couldn’t care less about it!
        </p>
      </div>

      {/* Interactive Visualizer */}
      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive Drill Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change state at the Root (Level 1) and watch the props travel through levels 2 and 3 down to level 4.
              </p>
            </div>
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User name"
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Theme: {theme}
              </button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="space-y-4">
          {/* Level 1: App Root */}
          <div className="p-4 rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400">
                Level 1: &lt;AppRoot&gt; (State Owner)
              </span>
              <Badge variant="blue" size="sm">🟢 Source of State</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              App holds <code>user</code> & <code>theme</code> in state and renders <code>&lt;Dashboard&gt;</code>.
            </p>

            {/* Passes down to Dashboard */}
            <Dashboard user={user} theme={theme} onUpdateName={setUserName} />
          </div>
        </CardBody>
      </Card>

      {/* Why is this bad? 3 Core Pain Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20">
          <div className="text-2xl mb-2">🧱</div>
          <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300 mb-1">
            1. Polluted Component APIs
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Components like <code>&lt;Dashboard&gt;</code> and <code>&lt;MainContent&gt;</code> now have their TypeScript props bloated with props they don't even use.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="text-2xl mb-2">🔨</div>
          <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">
            2. Brittle Refactoring
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            If you rename or remove a prop at the top, you must manually update 5 different files and interfaces all the way down the tree.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-1">
            3. The Context Solution
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            React's <strong>Context API</strong> lets us "teleport" data directly from Level 1 to Level 4 without bothering the components in between!
          </p>
        </div>
      </div>

      {/* Code Snippet Card */}
      <CodeBlock
        code={codeExample}
        language="tsx"
        filename="ThePropDrillingPattern.tsx"
        note="Notice how Parent and Child act as couriers. If Grandchild is 10 layers down, all 10 layers have to drill props!"
      />
    </div>
  );
}
