"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCart } from "../components/CartProvider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const payload = useMemo(
    () => ({
      items: items.map((i) => ({ id: i.id, qty: i.qty })),
      customer: { name, email },
    }),
    [items, name, email]
  );

  useEffect(() => {
    setError("");
    setClientSecret(null);
    if (!items.length) return;

    (async () => {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Could not start checkout.");
        return;
      }

      setClientSecret(data.clientSecret);
    })();
  }, [payload, items.length]);

  if (!items.length) {
    return (
      <main>
        <section className="container pageHeader">
          <h1 className="pageTitle">Checkout</h1>
          <p className="pageSub">Your cart is empty.</p>
        </section>
        <section className="container section">
          <div className="panel cartPanel">
            <Link className="btn btnGold" href="/sugar">Order Sweet Treats</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="container pageHeader">
        <h1 className="pageTitle">Checkout</h1>
        <p className="pageSub">
          Secure payment • Total: <strong>${subtotal.toFixed(2)} NZD</strong>
        </p>
      </section>

      <section className="container section">
        <div className="panel checkoutPanel">
          <div className="checkoutCols">
            <div className="checkoutLeft">
              <div className="kicker">Customer details</div>

              <input
                className="field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="field"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn btnGhost" href="/cart">Back to cart</Link>
              </div>

              <p className="menuNote" style={{ marginTop: 14 }}>
                Afterpay appears automatically when it’s enabled in Stripe and eligible for the order.
              </p>
            </div>

            <div className="checkoutRight">
              <div className="kicker">Payment</div>

              {error ? (
                <div className="panel" style={{ padding: 14, marginTop: 14 }}>
                  <strong>Error:</strong> {error}
                </div>
              ) : !clientSecret ? (
                <div className="panel" style={{ padding: 14, marginTop: 14 }}>
                  Loading secure payment…
                </div>
              ) : (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm onSuccess={clearCart} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (!stripe || !elements) return;

    setBusy(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
    });

    if (result.error) {
      setMsg(result.error.message || "Payment failed. Please try again.");
      setBusy(false);
      return;
    }

    // if it doesn't redirect (rare), clear cart
    onSuccess();
    setBusy(false);
  };

  return (
    <form onSubmit={pay} style={{ marginTop: 14 }}>
      <div className="paymentBox">
        <PaymentElement />
      </div>

      <button className="quoteBtn" type="submit" disabled={!stripe || busy}>
        {busy ? "PROCESSING…" : "PAY NOW"}
      </button>

      {msg ? <p className="menuNote" style={{ marginTop: 10 }}>{msg}</p> : null}
    </form>
  );
}