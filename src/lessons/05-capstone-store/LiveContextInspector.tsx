import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Badge } from '../../components/ui/Badge';

export function LiveContextInspector() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { itemCount, subtotal, discount, total, promoCode, items } = useCart();

  return (
    <aside
      aria-label="Live Context Inspector"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-slate-950/95 text-slate-100 rounded-2xl shadow-2xl border border-indigo-500/40 backdrop-blur-md transition-all duration-300 overflow-hidden font-mono"
    >
      {/* Header bar */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-900 border-b border-slate-800 text-xs font-bold cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white">Live Context Inspector</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
            3 Active Contexts
          </span>
          <span className="text-slate-400 text-xs">{isExpanded ? '▼ Hide' : '▲ Expand'}</span>
        </div>
      </button>

      {/* Body content */}
      {isExpanded && (
        <div className="p-4 space-y-4 text-xs max-h-96 overflow-y-auto">
          <p className="text-[11px] text-slate-400 font-sans leading-normal">
            This live inspector watches the 3 separate contexts in real time. Interact with the store and observe the state update here!
          </p>

          {/* ThemeContext */}
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-indigo-400 font-bold">1. ThemeContext</span>
              <Badge variant="blue" size="sm">useTheme()</Badge>
            </div>
            <div className="text-[11px] text-slate-300">
              theme: <span className="text-amber-300">"{theme}"</span>
            </div>
          </div>

          {/* AuthContext */}
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-violet-400 font-bold">2. AuthContext</span>
              <Badge variant="purple" size="sm">useAuth()</Badge>
            </div>
            <div className="text-[11px] text-slate-300">
              user: <span className="text-emerald-400">{user?.name ?? 'null'}</span>
            </div>
            <div className="text-[11px] text-slate-300">
              role: <span className="text-indigo-300 font-semibold">{user?.role ?? 'none'}</span> | authenticated: <span className={isAuthenticated ? 'text-emerald-400' : 'text-rose-400'}>{String(isAuthenticated)}</span>
            </div>
          </div>

          {/* CartContext */}
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">3. CartContext</span>
              <Badge variant="green" size="sm">useCart()</Badge>
            </div>
            <div className="text-[11px] text-slate-300">
              total items: <span className="text-amber-300 font-bold">{itemCount}</span> ({items.length} unique)
            </div>
            <div className="text-[11px] text-slate-300">
              subtotal: <span className="text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-slate-300">
              discount: <span className="text-rose-400">-${discount.toFixed(2)}</span> {promoCode && `(${promoCode})`}
            </div>
            <div className="text-[11px] font-bold text-emerald-400">
              final total: ${total.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
