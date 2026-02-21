"use client";

import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem, clearCart } = useCart();

  return (
    <main>
      <section className="container pageHeader">
        <h1 className="pageTitle">Cart</h1>
        <p className="pageSub">
          Review your items and proceed to secure checkout.
        </p>
      </section>

      <section className="container section">
        <div className="panel cartPanel" style={{ padding: 18 }}>
          {items.length === 0 ? (
            <div style={{ display: "grid", gap: 12 }}>
              <p>Your cart is empty.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn btnGold" href="/sugar">
                  Order Sweet Treats
                </Link>
                <Link className="btn btnGhost" href="/bites">
                  Request Charcuterie
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {items.map((i) => (
                <div
                  key={i.id}
                  className="card"
                  style={{
                    padding: 14,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{i.name}</div>
                    <div style={{ color: "rgba(18,18,18,0.62)", fontSize: 14 }}>
                      ${i.unitPrice.toFixed(2)} NZD • each
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      className="btn btnGhost"
                      onClick={() => setQty(i.id, i.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <div style={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>
                      {i.qty}
                    </div>

                    <button
                      className="btn btnGhost"
                      onClick={() => setQty(i.id, i.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <button
                      className="btn btnGhost"
                      onClick={() => removeItem(i.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="card"
                style={{
                  padding: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontWeight: 800 }}>Subtotal</div>
                <div style={{ fontWeight: 800 }}>${subtotal.toFixed(2)} NZD</div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn btnGold" href="/checkout">
                  Checkout
                </Link>
                <button className="btn btnGhost" onClick={clearCart}>
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}