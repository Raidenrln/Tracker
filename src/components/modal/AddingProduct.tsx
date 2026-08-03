import React, { useState } from "react";
import { ChevronDown, PlusSquare } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { ProductModel } from "../../model/ProductModel";
import { v4 as uuidv4 } from 'uuid';
interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: string;
  currency: string;
}

type AddingProductProps = {
  storeId: string | null;
  onClose: () => void;
};

const CATEGORIES = [
  "Food",
  "Drinks",
  "Snacks",
  "Merchandise",
  "Other",
];

const CURRENCIES = [
  { value: "PHP", label: "PHP (₱)" },
  { value: "USD", label: "USD ($)" },
];

export default function AddingProduct({storeId, onClose}: AddingProductProps) {
  const { stores, addProduct } = useStore();
  const randomUUID = uuidv4();
  const [formData, setFormData] = useState<ProductModel>({
    id: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    currency: "PHP",
  });
  const handleChange = (
    field: keyof ProductFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeId) return;

    const newProduct: ProductModel = {
    id: uuidv4(),
    name: formData.name,
    category: formData.category,
    description: formData.description,
    price: Number(formData.price), // convert string → number
    currency: formData.currency,
    };

    addProduct(storeId, newProduct);
    console.log("Submitting product:", newProduct, stores);
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      description: "",
      price: 0,
      currency: "PHP",
    });
  };

  return (
    <div onDoubleClick={() => onClose()} className="h-auto rounded-2xl bg-[#f4f2ed] p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900">Add a Product</h1>
        <p className="text-neutral-500 mt-1 mb-6">
          Fill in the details below to add a new product to your store.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <section className="bg-white rounded-xl border-l-4 border-l-emerald-700 border border-neutral-200 p-6">
            <h2 className="text-xs font-semibold tracking-wider text-neutral-400 mb-4">
              BASIC INFO
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Iced Coffee"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
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
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                Description{" "}
                <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-normal text-neutral-400">
                  optional
                </span>
              </label>
              <textarea
                placeholder="A short description of the product..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full resize-y rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 49.00"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-1.5">
                  Currency
                </label>
                <div className="relative">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-600"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
            >
              <PlusSquare size={16} />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}