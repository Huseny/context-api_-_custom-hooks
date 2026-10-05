import { useState, useMemo } from 'react';
import { SAMPLE_PRODUCTS } from '../../data/mockData';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { StoreNavbar } from './StoreNavbar';
import { LiveContextInspector } from './LiveContextInspector';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import { useToggle } from '../../hooks/useToggle';
import { useDebounce } from '../../hooks/useDebounce';
import { Badge } from '../../components/ui/Badge';
import { CodeBlock } from '../../components/ui/CodeBlock';

function StoreContent() {
  const [isCartOpen, , openCart, closeCart] = useToggle(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rawSearch, setRawSearch] = useState('');
  const debouncedSearch = useDebounce(rawSearch, 300);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'courses', label: 'Courses' },
    { id: 'books', label: 'Books' },
    { id: 'swag', label: 'Dev Swag' },
    { id: 'tools', label: 'Hardware' },
  ];

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearch]);

  return (
    <div className="space-y-6">
      {/* Store Navigation Bar (Consumes AuthContext + CartContext) */}
      <StoreNavbar onOpenCart={openCart} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search using useDebounce */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={rawSearch}
            onChange={(e) => setRawSearch(e.target.value)}
            placeholder="Search items (debounced)..."
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No products found matching "{debouncedSearch}"
          </p>
          <button
            onClick={() => {
              setRawSearch('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      {/* Floating Real-Time Context Inspector */}
      <LiveContextInspector />
    </div>
  );
}

export function CapstoneStoreDemo() {
  const architectureSnippet = `// 🏗️ REAL-WORLD APP ARCHITECTURE:
// Wrap your app with Providers. Each Provider manages its own slice of state!

export function App() {
  return (
    <ThemeProvider>        {/* 1. ThemeContext: light, dark */}
      <AuthProvider>       {/* 2. AuthContext: user, login, logout */}
        <CartProvider>     {/* 3. CartContext: items, add, remove, total */}
          <StoreNavbar />  {/* Consumes Auth & Cart */}
          <ProductGrid />  {/* Consumes Cart */}
          <CartDrawer />   {/* Consumes Cart */}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="purple">Capstone Project</Badge>
          <span className="text-xs text-slate-400">Lesson 5 of 5</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Interactive Capstone: E-Commerce Store & Pricing Page
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Here is how modern React applications organize state. Notice that <strong>zero props</strong> are drilled!
          Components consume exactly what they need via custom hooks (<code>useTheme</code>, <code>useAuth</code>, <code>useCart</code>, <code>useToggle</code>, <code>useDebounce</code>).
        </p>
      </div>

      {/* The Live Store with Context Providers */}
      <AuthProvider>
        <CartProvider>
          <StoreContent />
        </CartProvider>
      </AuthProvider>

      {/* How It All Fits Together Diagram */}
      <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🧩</span> Why Multiple Contexts Are Better Than One Huge Monolith
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Beginners sometimes make the mistake of creating a single <code>GlobalAppContext</code> containing theme, auth, cart, notifications, and forms all in one object.
          <strong> Don't do that!</strong> Whenever any value in a Context changes, <em>every single component</em> consuming that Context re-renders.
          By splitting into separate contexts (<code>ThemeContext</code>, <code>AuthContext</code>, <code>CartContext</code>):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">1. Laser Focus</strong>
            Each context has one single responsibility. Code is modular and simple to test.
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">2. Performance</strong>
            Adding an item to the cart only re-renders cart-related components — NOT your navbar theme buttons!
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <strong className="text-violet-600 dark:text-violet-400 block mb-1">3. Scalability</strong>
            Adding a new feature (e.g. notifications) just means creating a new <code>NotificationContext</code> without risking bugs in existing code.
          </div>
        </div>
      </div>

      {/* Code Snippet Card */}
      <CodeBlock
        code={architectureSnippet}
        language="tsx"
        filename="AppArchitecture.tsx"
        note="Notice the clean provider hierarchy. Providers can be nested in any order as long as any consumer is inside its respective Provider."
      />
    </div>
  );
}
