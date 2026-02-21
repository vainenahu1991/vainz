"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type CheckoutItem = {
  id: string;
  name: string;
  unitPrice: number; // NZD dollars
  qty: number;
};

export default function PayButton() {
  const { items } = useCart(); // <-- this is what fixes "Cannot find name 'cart'"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasItems = Array.isArray(items) && items.length > 0;

  const handleCheckout = async () => {
    setError(null);

    if (!hasItems) {
      setError("Your cart is empty.");
      return;
    }

    // Convert cart items into what /api/checkout expects
    const payloadItems: CheckoutItem[] = items.map((i) => ({
      id: i.id,
      name: i.name,
      unitPrice: i.unitPrice,
      qty: i.qty,
    }));

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payloadItems }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Checkout failed. Please try again.");
        return;
      }

      if (data?.url) {
        window.location.href = data.url; // Stripe Checkout URL
        return;
      }

      setError("Checkout failed (missing redirect URL).");
    } catch (e: any) {
      setError(e?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button
        className="btn btnGold"
        onClick={handleCheckout}
        disabled={!hasItems || loading}
        aria-busy={loading}
      >
        {loading ? "Redirecting…" : "Checkout"}
      </button>

      {error ? (
        <p style={{ margin: 0, color: "crimson", fontWeight: 600 }}>{error}</p>
      ) : null}
    </div>
  );
}