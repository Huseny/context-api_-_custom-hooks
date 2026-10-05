import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import type { UserRole } from '../../types';

interface StoreNavbarProps {
  onOpenCart: () => void;
}

export function StoreNavbar({ onOpenCart }: StoreNavbarProps) {
  const { user, login } = useAuth();
  const { itemCount } = useCart();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    login(e.target.value as UserRole);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Store Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            🛍️
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
              DevGear & Masterclass Store
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Powered by <code>ThemeProvider</code>, <code>AuthProvider</code> & <code>CartProvider</code>
            </p>
          </div>
        </div>

        {/* Right side: Auth State & Cart Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* User Profile Pill (AuthContext) */}
          <div className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {user ? (
              <>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-indigo-500"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize flex items-center gap-1">
                    <span>Role:</span>
                    <select
                      value={user.role}
                      onChange={handleRoleChange}
                      className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer focus:outline-none"
                    >
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                      <option value="admin">Admin</option>
                      <option value="guest">Guest</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-500 px-2">Not Logged In</span>
            )}
          </div>

          {/* Cart Button (CartContext) */}
          <Button
            variant="primary"
            size="md"
            onClick={onOpenCart}
            className="relative"
            icon={<span>🛒</span>}
          >
            <span>Cart</span>
            {itemCount > 0 && (
              <Badge
                variant="amber"
                size="sm"
                className="ml-1 bg-amber-400 text-slate-950 font-black font-mono border-none"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
