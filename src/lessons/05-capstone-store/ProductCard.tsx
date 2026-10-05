import { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Check how many of this item is currently in the cart
  const itemInCart = items.find((i) => i.product.id === product.id);
  const currentQty = itemInCart?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <Card hoverEffect className="flex flex-col h-full overflow-hidden">
      {/* Product Image & Badges */}
      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {product.badge && (
            <Badge variant="purple" size="sm">
              {product.badge}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 px-2 py-0.5 rounded-full shadow-xs">
            ⭐ {product.rating}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            {product.category}
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Price</span>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <Button
            size="sm"
            variant={justAdded ? 'success' : 'primary'}
            onClick={handleAdd}
          >
            {justAdded ? '✓ Added!' : currentQty > 0 ? `In Cart (${currentQty}) +` : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
