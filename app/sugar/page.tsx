"use client";

import { useState } from "react";
import { useCart } from "../components/CartProvider";

type Variant = {
  id: string;
  label: string;
  price: number;
};

type Product = {
  title: string;
  flavors?: string[];
  variants: Variant[];
};

/* ✅ Prices reduced by $10 */
const PRODUCTS: Product[] = [
  {
    title: "Cakesicles (per dozen)",
    flavors: ["Vanilla", "Chocolate", "Caramel", "Hazelnut", "Banana & Coffee"],
    variants: [
      { id: "Cakesicles__Standard Theme", label: "Standard Theme", price: 75 },
      { id: "Cakesicles__Detailed Theme", label: "Detailed Theme", price: 95 },
    ],
  },
  {
    title: "Chocolate Covered Oreos (per dozen)",
    variants: [
      { id: "Chocolate Covered Oreos__Standard", label: "Standard", price: 45 },
      { id: "Chocolate Covered Oreos__Edible Image", label: "Edible Image", price: 58 },
    ],
  },
  {
    title: "Krispie Treats (per dozen)",
    variants: [
      { id: "Krispie Treats__Standard", label: "Standard", price: 55 },
      { id: "Krispie Treats__Detailed Theme", label: "Detailed Theme", price: 70 },
    ],
  },
  {
    title: "Wafer Rods (per dozen)",
    variants: [
      { id: "Wafer Rods__Standard", label: "Standard", price: 45 },
      { id: "Wafer Rods__Detailed Theme", label: "Detailed Theme", price: 60 },
    ],
  },
  {
    title: "Chocolate Covered Strawberries (per dozen)",
    variants: [
      { id: "Chocolate Covered Strawberries__Standard", label: "Standard", price: 60 },
      { id: "Chocolate Covered Strawberries__Detailed Theme", label: "Detailed Theme", price: 75 },
    ],
  },
];

export default function SugarPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="sugarHero">
        <div className="heroContent">
          <div className="kicker">SWEET TREATS</div>
          <h1 className="pageTitle">Order Sugar</h1>
          <p className="pageSub">
            Choose your treat • choose your theme • we create the magic.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container section">
        <div className="panel" style={{ padding: 18 }}>
          <div className="grid grid2">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.title} product={p} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* HERO */
        .sugarHero {
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-image: url("/images/hero-sugar.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .heroContent {
          background: rgba(255, 255, 255, 0.7);
          padding: 40px 60px;
          border-radius: 28px;
        }

        .kicker {
          letter-spacing: 4px;
          font-size: 13px;
          color: #7a6f64;
          margin-bottom: 16px;
        }

        .pageTitle {
          font-size: 72px;
          font-weight: 500;
          margin: 0 0 18px;
          color: #2e2a27;
        }

        .pageSub {
          font-size: 18px;
          color: #4a4036;
          margin: 0;
        }

        @media (max-width: 768px) {
          .sugarHero {
            height: 420px;
          }

          .pageTitle {
            font-size: 48px;
          }

          .heroContent {
            padding: 28px;
          }
        }
      `}</style>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <h3 style={{ fontFamily: "var(--font-playfair)" }}>{product.title}</h3>

      {product.flavors?.length ? (
        <p style={{ marginTop: 10 }}>
          <strong>Flavours:</strong> {product.flavors.join(", ")}
        </p>
      ) : null}

      <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
        {product.variants.map((v) => (
          <VariantRow
            key={v.id}
            title={v.label}
            price={v.price}
            id={v.id}
            productTitle={product.title}
          />
        ))}
      </div>
    </div>
  );
}

function VariantRow({
  title,
  price,
  id,
  productTitle,
}: {
  title: string;
  price: number;
  id: string;
  productTitle: string;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const name = `${productTitle} — ${title}`;

  return (
    <div
      className="panel"
      style={{
        padding: 14,
        borderRadius: 18,
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 800 }}>{title}</div>
        <div style={{ fontWeight: 800, color: "var(--gold)" }}>${price}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <button className="btn btnGhost" onClick={() => setQty((q) => Math.max(1, q - 1))}>
          −
        </button>

        <div style={{ minWidth: 34, textAlign: "center", fontWeight: 800 }}>{qty}</div>

        <button className="btn btnGhost" onClick={() => setQty((q) => Math.min(99, q + 1))}>
          +
        </button>

        <button
          className="btn btnGold"
          onClick={() =>
            addItem(
              { id, name, unitPrice: price },
              qty
            )
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}