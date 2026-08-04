import { useState } from "react";
import { X, Plus, Minus, Lock, Coffee, Wheat } from "lucide-react";

interface CheckoutItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  icon: "coffee" | "bread";
}

interface CheckoutModalProps {
  onClose?: () => void;
  onPay?: (total: number) => void;
}

const initialItems: CheckoutItem[] = [
  { id: "1", name: "Nescafe creamy white", category: "Drinks", price: 15, quantity: 10, icon: "coffee" },
  { id: "2", name: "Wheat loaf bread", category: "Bakery", price: 45, quantity: 2, icon: "bread" },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Drinks: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Bakery: { bg: "bg-amber-50", text: "text-amber-700" },
};

const iconMap = {
  coffee: Coffee,
  bread: Wheat,
};

export default function CheckoutModal({ onClose, onPay }: CheckoutModalProps) {
  const [items, setItems] = useState<CheckoutItem[]>(initialItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-[420px] w-full flex items-center justify-center bg-transparent p-8">
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 m-0">Checkout</h2>
            <p className="text-sm text-gray-500 mt-1">
              Review your order before you pay.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5">
          {items.map((item, idx) => {
            const colors = categoryColors[item.category] ?? {
              bg: "bg-gray-50",
              text: "text-gray-700",
            };
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 py-3 ${
                  idx < items.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors.bg}`}
                >
                  <Icon size={18} className={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {item.name}
                  </p>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full mt-0.5 ${colors.bg} ${colors.text}`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                    className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={13} className="text-gray-600" />
                  </button>
                  <span className="text-sm font-semibold text-gray-900 min-w-[18px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                    className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={13} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-gray-900 w-16 text-right">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-baseline justify-between px-5 pt-4">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            ₱{total.toFixed(2)}
          </span>
        </div>

        <div className="p-5">
          <button
            onClick={() => onPay?.(total)}
            className="w-full h-11 rounded-lg bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors"
          >
            <Lock size={16} />
            Pay ₱{total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}