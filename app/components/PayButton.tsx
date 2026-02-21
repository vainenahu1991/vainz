"use client";

import React, { useState } from "react";
import { useCart } from "./CartProvider";

type CheckoutItem = {
  id: string;
  name: string;
  price: number; // dollars
  quantity: number;
};

export default function PayButton() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = loading || items.length === 0;

  async function handleCheckout() {
    setError(null);
    setLoading(true);

    try {
      const payload = {
        items: items.map<CheckoutItem>((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Checkout failed.");
      }

      // route.ts should return { url: "https://checkout.stripe.com/..." }
      if (!data?.url) {
        throw new Error("No checkout URL returned from server.");
      }

      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
      <button
        onClick={handleCheckout}
        disabled={disabled}
        style={{
          padding: "14px 18px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.12)",
          cursor: disabled ? "not-allowed" : "pointer",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {loading
          ? "Redirecting…"
          : items.length === 0
          ? "Cart is empty"
          : `Checkout — $${subtotal.toFixed(2)}`}
      </button>

      {error ? (
        <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>
      ) : null}
    </div>
  );
}