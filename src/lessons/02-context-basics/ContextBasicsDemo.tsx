import { createContext, useContext, useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CodeBlock } from '../../components/ui/CodeBlock';

// =========================================================================
// STEP 1: CREATE CONTEXT (The Radio Frequency)
// =========================================================================
interface RadioBroadcast {
  station: string;
  currentTrack: string;
  volume: number;
  isOnAir: boolean;
}

// Default value is used ONLY if a component calls useContext without any Provider above it!
const RadioContext = createContext<RadioBroadcast>({
  station: '98.5 Chill FM',
  currentTrack: 'Ambient Lofi Beats',
  volume: 75,
  isOnAir: true,
});

// =========================================================================
// STEP 3: CONSUMER RADIOS (Receivers)
// Notice these components take NO PROPS! They tune directly into RadioContext.
// =========================================================================

function LivingRoomRadio() {
  const radio = useContext(RadioContext);

  return (
    <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          🛋️ Living Room Radio
        </span>
        <Badge variant={radio.isOnAir ? 'green' : 'slate'} size="sm">
          {radio.isOnAir ? 'Receiving' : 'Static'}
        </Badge>
      </div>
      {radio.isOnAir ? (
        <div className="text-xs space-y-1">
          <p className="text-slate-500 dark:text-slate-400">Station: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{radio.station}</span></p>
          <p className="text-slate-700 dark:text-slate-200 font-medium">🎵 {radio.currentTrack}</p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Radio is silent (Off Air)...</p>
      )}
    </div>
  );
}

function KitchenRadio() {
  const radio = useContext(RadioContext);

  return (
    <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          🍳 Kitchen Radio
        </span>
        <Badge variant={radio.isOnAir ? 'green' : 'slate'} size="sm">
          {radio.isOnAir ? 'Receiving' : 'Static'}
        </Badge>
      </div>
      {radio.isOnAir ? (
        <div className="text-xs space-y-1">
          <p className="text-slate-500 dark:text-slate-400">Station: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{radio.station}</span></p>
          <p className="text-slate-700 dark:text-slate-200 font-medium">🎵 {radio.currentTrack}</p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Radio is silent (Off Air)...</p>
      )}
    </div>
  );
}

function GarageRadio() {
  const radio = useContext(RadioContext);

  return (
    <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          🚗 Garage Radio
        </span>
        <Badge variant={radio.isOnAir ? 'green' : 'slate'} size="sm">
          {radio.isOnAir ? 'Receiving' : 'Static'}
        </Badge>
      </div>
      {radio.isOnAir ? (
        <div className="text-xs space-y-1">
          <p className="text-slate-500 dark:text-slate-400">Station: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{radio.station}</span></p>
          <p className="text-slate-700 dark:text-slate-200 font-medium">🎵 {radio.currentTrack}</p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Radio is silent (Off Air)...</p>
      )}
    </div>
  );
}

// An intermediate container component that takes ZERO props!
function HouseInterior() {
  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          🏠 &lt;HouseInterior&gt; (Passes zero props down!)
        </span>
        <Badge variant="blue" size="sm">Clean Component Tree</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <LivingRoomRadio />
        <KitchenRadio />
        <GarageRadio />
      </div>
    </div>
  );
}

export function ContextBasicsDemo() {
  const [station, setStation] = useState('104.2 Indie Rock');
  const [currentTrack, setCurrentTrack] = useState('Fluorescent Adolescent');
  const [isOnAir, setIsOnAir] = useState(true);

  const playlist = [
    { track: 'Fluorescent Adolescent', station: '104.2 Indie Rock' },
    { track: 'Midnight City - M83', station: '98.5 Chill Wave' },
    { track: 'Billie Jean - Michael Jackson', station: '101.1 Classics' },
    { track: 'Synthesizer Dreams', station: '89.3 Synthwave' },
  ];

  const codeSteps = `// 🟢 THE 3-STEP CONTEXT FORMULA:

// Step 1: Create the Context outside your components
import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext("light"); // Default value

// Step 2: Wrap your component tree with the Provider & provide a 'value'
export function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <PageLayout />  {/* No props passed! */}
    </ThemeContext.Provider>
  );
}

// Step 3: Consume the value anywhere inside the tree with useContext()
export function HeaderButton() {
  const theme = useContext(ThemeContext); // Teleports value here!
  return <button className={theme}>Click me</button>;
}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="green">Core Mental Model</Badge>
          <span className="text-xs text-slate-400">Lesson 2 of 5</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          The 3-Step Formula of React Context
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Think of Context API as a <strong>Radio Station Tower</strong>.
          The tower broadcasts information across the whole city. Any house or car with an antenna can tune in
          directly — without stringing physical wires between every building!
        </p>
      </div>

      {/* The Metaphor Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-3">
            1
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-mono">
            createContext()
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Allocates a unique radio frequency (a Context object) so broadcasters and receivers know what channel to tune into.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/20">
          <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-sm mb-3">
            2
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-mono">
            &lt;Context.Provider&gt;
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The transmitter tower. It takes a <code>value=&#123;...&#125;</code> prop and broadcasts it to every descendant component in its tree.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3">
            3
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-mono">
            useContext(Context)
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The antenna. Any component anywhere inside the Provider can call <code>useContext()</code> to grab the broadcasted data immediately.
          </p>
        </div>
      </div>

      {/* Interactive Radio Transmitter Station */}
      <Card>
        <CardHeader className="bg-slate-50 dark:bg-slate-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📡</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Live Radio Station Transmitter (The Provider)
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change tracks or toggle broadcasting. Watch all 3 receiver radios update instantaneously without passing props!
              </p>
            </div>
            <Button
              variant={isOnAir ? 'danger' : 'success'}
              size="sm"
              onClick={() => setIsOnAir((prev) => !prev)}
            >
              {isOnAir ? 'Turn Off Air' : 'Go On Air'}
            </Button>
          </div>
        </CardHeader>

        <CardBody className="space-y-6">
          {/* Broadcaster Controls */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
              Broadcast Playlist:
            </span>
            {playlist.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setStation(item.station);
                  setCurrentTrack(item.track);
                  setIsOnAir(true);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                  currentTrack === item.track && isOnAir
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.station} - {item.track}
              </button>
            ))}
          </div>

          {/* STEP 2: PROVIDER WRAPPER */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              <span>&lt;RadioContext.Provider value=&#123;&#123; station, currentTrack, isOnAir &#125;&#125;&gt;</span>
            </div>

            {/* The child tree receiving context */}
            <RadioContext.Provider
              value={{
                station,
                currentTrack,
                volume: 80,
                isOnAir,
              }}
            >
              <HouseInterior />
            </RadioContext.Provider>

            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              <span>&lt;/RadioContext.Provider&gt;</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Code Snippet Card */}
      <CodeBlock
        code={codeSteps}
        language="tsx"
        filename="The3StepFormula.tsx"
        note="Whenever the 'value' passed to the Provider changes, any component that called useContext(ThemeContext) will re-render automatically with the new value!"
      />
    </div>
  );
}
