"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Variant = {
  name: string;
  price?: number;
  priceRange?: [number, number];
};

type Product = {
  name: string;
  note?: string;
  variants: Variant[];
};

const PRODUCTS: Product[] = [
  {
    name: "Cakesicles (per dozen)",
    variants: [
      { name: "Standard Theme", price: 85 },
      { name: "Detailed Theme", priceRange: [100, 110] },
    ],
  },
  {
    name: "Chocolate Covered Oreos (per dozen)",
    variants: [
      { name: "Standard", price: 55 },
      { name: "Edible Image", price: 68 },
    ],
  },
  {
    name: "Chocolate Wafer Rods (per dozen)",
    variants: [
      { name: "Standard", price: 50 },
      { name: "Themed", price: 62 },
    ],
  },
  {
    name: "Chocolate Dipped Krispy Treats (per dozen)",
    variants: [
      { name: "Standard", price: 75 },
      { name: "Detailed", priceRange: [88, 96] },
    ],
  },
  {
    name: "Mixed Dozen (3–4 varieties)",
    note: "Pricing varies by design complexity and inclusions.",
    variants: [{ name: "Mixed Dozen", priceRange: [95, 120] }],
  },
];

type CartItem = {
  id: string;
  product: string;
  variant: string;
  unitPrice: number; // NZD
  qty: number;
};

function formatPrice(v: Variant) {
  if (typeof v.price === "number") return `$${v.price}`;
  if (v.priceRange) return `$${v.priceRange[0]}–$${v.priceRange[1]}`;
  return "";
}

function basePrice(v: Variant) {
  return typeof v.price === "number" ? v.price : v.priceRange ? v.priceRange[0] : 0;
}

export default function SweetTreatsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: string, variant: Variant, qty: number) => {
    const unitPrice = basePrice(variant);
    const id = `${product}__${variant.name}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id, product, variant: variant.name, unitPrice, qty }];
    });
  };

  const updateQty = (id: string, nextQty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, nextQty) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    [cart]
  );

  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c] px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden mb-10">
          <Image
            src="/images/sugar-milestone-cakesicles.png"
            alt="Luxury milestone cakesicles"
            fill
            priority
            className="object-cover"
          />
        </div>

        <header className="text-center mb-14 sm:mb-16">
          <p className="font-serif text-[#b8860b] text-sm uppercase tracking-[0.2em] mb-2">
            Order
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide">
            Sweet Treats
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            Pricing is <span className="font-medium text-[#1c1c1c]">per dozen</span>.
            Choose a variant, set quantity, and add to cart.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Pickup & Delivery • Afterpay at checkout
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <section className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="reflection rounded-2xl p-6 sm:p-8">
                <h2 className="font-serif text-xl font-light text-[#1c1c1c]">{p.name}</h2>
                {p.note && <p className="mt-2 text-sm text-neutral-500">{p.note}</p>}

                <div className="mt-6 space-y-4">
                  {p.variants.map((v) => (
                    <VariantRow
                      key={v.name}
                      productName={p.name}
                      variant={v}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <aside className="reflection rounded-2xl p-6 sm:p-8 h-fit lg:sticky lg:top-28">
            <h3 className="font-serif text-xl font-light text-[#1c1c1c]">Cart</h3>

            {cart.length === 0 ? (
              <p className="mt-6 text-neutral-500 text-sm">Your cart is empty.</p>
            ) : (
              <div className="mt-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-neutral-200 pb-4">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#1c1c1c]">{item.product}</p>
                        <p className="text-sm text-neutral-500">{item.variant}</p>
                        <p className="text-sm text-neutral-500">${item.unitPrice} each</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-neutral-500 hover:text-[#b8860b] transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-[#b8860b]/30 hover:text-[#b8860b] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, Number(e.target.value || 1))}
                          className="w-14 text-center border border-neutral-200 rounded-lg py-2 text-sm focus:border-[#b8860b]/50 focus:ring-1 focus:ring-[#b8860b]/30 outline-none"
                          inputMode="numeric"
                        />
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-[#b8860b]/30 hover:text-[#b8860b] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-medium text-[#1c1c1c]">
                        ${item.unitPrice * item.qty}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-2 font-medium text-[#1c1c1c]">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items: cart }),
                      });

                      const data = await res.json().catch(() => ({}));

                      if (!res.ok) {
                        alert(data?.error || "Checkout failed.");
                        return;
                      }

                      if (data?.url) {
                        window.location.href = data.url;
                      } else {
                        alert("No checkout URL returned.");
                      }
                    } catch (e: any) {
                      alert(e?.message || "Checkout crashed.");
                    }
                  }}
                  className="mt-6 w-full btn-gold py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider"
                >
                  Checkout
                </button>

                <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
                  Some items may be pickup-only. Shipping confirmed at checkout or via message.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function VariantRow({
  productName,
  variant,
  onAdd,
}: {
  productName: string;
  variant: Variant;
  onAdd: (product: string, variant: Variant, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border border-neutral-200 rounded-xl p-4 hover:border-[#b8860b]/20 transition-colors">
      <div>
        <p className="font-medium text-[#1c1c1c]">{variant.name}</p>
        <p className="text-sm text-[#b8860b]">{formatPrice(variant)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-[#b8860b]/30 hover:text-[#b8860b] transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="w-14 text-center border border-neutral-200 rounded-lg py-2 text-sm focus:border-[#b8860b]/50 outline-none"
          inputMode="numeric"
        />
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-[#b8860b]/30 hover:text-[#b8860b] transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>

        <button
          onClick={() => onAdd(productName, variant, qty)}
          className="shimmer-gold px-5 py-2.5 bg-[#b8860b] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
        >
          Add
        </button>
      </div>
    </div>
  );
}