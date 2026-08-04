import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  PlusSquare,
  Pencil,
  Trash2,
  Package,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import type { ProductModel } from "../../model/ProductModel";
import { useStore } from "../../context/StoreContext";
import { RiCloseFill } from "react-icons/ri";

type ProductListProps = {
  storeId: string | null;
  addingProduct: (id: string) => void;
  onClose: () => void;
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  PHP: "₱",
  USD: "$",
  EUR: "€",
};


const SAMPLE_PRODUCTS: ProductModel[] = [
  {
    id: "1",
    name: "Iced Coffee",
    category: "Drinks",
    description: "Cold brew coffee served over ice.",
    price: 49,
    currency: "PHP",
  },
  {
    id: "2",
    name: "Blueberry Muffin",
    category: "Food",
    description: "Freshly baked muffin with blueberries.",
    price: 65,
    currency: "PHP",
  },
  {
    id: "3",
    name: "Matcha Latte",
    category: "Drinks",
    description: "Ceremonial grade matcha with steamed milk.",
    price: 120,
    currency: "PHP",
  },
  {
    id: "4",
    name: "Store Tote Bag",
    category: "Merchandise",
    description: "Canvas tote bag with store logo.",
    price: 250,
    currency: "PHP",
  },
  {
    id: "5",
    name: "Trail Mix",
    category: "Snacks",
    description: "",
    price: 35,
    currency: "PHP",
  },
];

const CATEGORY_FILTERS = ["All", "Food", "Drinks", "Snacks", "Merchandise", "Other"];

type CartState = Record<string, number>;

export default function ProductList({ storeId, onClose, addingProduct }: ProductListProps) {
  const { stores } = useStore();

const store = stores.find((s) => s.id === storeId);
const products = store?.products ?? [];

const [search, setSearch] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");
const [cart, setCart] = useState<CartState>({});

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number, currency: string) => {
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
    return `${symbol}${price.toFixed(2)}`;
  };

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const decrementCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    
    <div className="max-h-[90vh] flex flex-col rounded bg-[#f4f2ed] p-4 sm:p-6 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col flex-1 h-auto min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Products
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 mt-1">
              Manage the products available in your store.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="View cart"
              className="relative flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="hidden sm:flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors whitespace-nowrap"
              onClick={() => {
              console.log("Button clicked");
              console.log("storeId:", storeId);

              if (storeId) {
                addingProduct(storeId);
              }
             }}
            >
              <PlusSquare size={16} />
              Add Product
            </button>
            <button className="relative flex items-center justify-center h-10 w-10 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors">
              <RiCloseFill color="red" size={20} onClick={() => onClose()}/>
            </button>
          </div>
        </div>

        {/* Mobile add product button */}
        <button
          type="button"
          className="sm:hidden w-full mb-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
          onClick={() => {
              console.log("Button clicked");
              console.log("storeId:", storeId);

              if (storeId) {
                addingProduct(storeId);
              }
             }}
        >
          <PlusSquare size={16} />
          Add Product
        </button>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto appearance-none rounded-lg border border-neutral-200 bg-white pl-3.5 pr-9 py-2.5 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
            >
              {CATEGORY_FILTERS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>

        {/* Empty state (shared) */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 px-6 py-16 flex flex-col items-center justify-center text-center gap-2">
            <Package size={28} className="text-neutral-300" />
            <p className="text-sm font-semibold text-neutral-900">
              No products found
            </p>
            <p className="text-xs text-neutral-400">
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {/* Desktop table (md and up) */}
        {filtered.length > 0 && (
          <div className="hidden md:block flex-1 min-h-0 overflow-y-auto rounded-xl border border-neutral-200 bg-white"
          style={{scrollbarWidth: "none"}}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="text-left font-semibold text-neutral-500 text-xs tracking-wider uppercase px-6 py-3">
                    Product
                  </th>
                  <th className="text-left font-semibold text-neutral-500 text-xs tracking-wider uppercase px-6 py-3">
                    Category
                  </th>
                  <th className="text-right font-semibold text-neutral-500 text-xs tracking-wider uppercase px-6 py-3">
                    Price
                  </th>
                  <th className="text-right font-semibold text-neutral-500 text-xs tracking-wider uppercase px-6 py-3">
                    Cart
                  </th>
                  <th className="text-right font-semibold text-neutral-500 text-xs tracking-wider uppercase px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="max-h-full overflow-y-auto">
                {filtered.map((product) => {
                  const qty = cart[product.id] ?? 0;
                  return (
                    <tr
                      key={product.id}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/60 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-neutral-900">
                          {product.name}
                        </p>
                        {product.description && (
                          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                            {product.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-neutral-900">
                        {formatPrice(product.price, product.currency)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => addToCart(product.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors whitespace-nowrap"
                            >
                              <ShoppingCart size={13} />
                              Add
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-1">
                              <button
                                type="button"
                                aria-label={`Remove one ${product.name}`}
                                onClick={() => decrementCart(product.id)}
                                className="p-1.5 text-neutral-500 hover:text-emerald-700 transition-colors"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="text-xs font-semibold text-neutral-900 w-4 text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                aria-label={`Add one more ${product.name}`}
                                onClick={() => addToCart(product.id)}
                                className="p-1.5 text-neutral-500 hover:text-emerald-700 transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Edit ${product.name}`}
                            className="p-2 rounded-lg text-neutral-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${product.name}`}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile cards (below md) */}
        {filtered.length > 0 && (
          <div className="md:hidden flex flex-col gap-3 min-h-0 overflow-y-auto" style={{scrollbarWidth: "none"}}>
            {filtered.map((product) => {
              const qty = cart[product.id] ?? 0;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-neutral-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <span className="inline-flex mt-2 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        type="button"
                        aria-label={`Edit ${product.name}`}
                        className="p-2 rounded-lg text-neutral-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                    <span className="font-semibold text-neutral-900">
                      {formatPrice(product.price, product.currency)}
                    </span>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                      >
                        <ShoppingCart size={14} />
                        Add to cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 px-2 py-1">
                        <button
                          type="button"
                          aria-label={`Remove one ${product.name}`}
                          onClick={() => decrementCart(product.id)}
                          className="p-1 text-neutral-500 hover:text-emerald-700 transition-colors"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="text-sm font-semibold text-neutral-900 w-4 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Add one more ${product.name}`}
                          onClick={() => addToCart(product.id)}
                          className="p-1 text-neutral-500 hover:text-emerald-700 transition-colors"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p className="text-xs text-neutral-400 mt-3">
          Showing {filtered.length} of {products.length} products.
        </p>
      </div>

      
    </div>
  );
}