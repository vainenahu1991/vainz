import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

type IncomingItem = { id: string; qty: number };

const CATALOG: Record<string, { name: string; unitPrice: number }> = {
  "Cakesicles__Standard Theme": { name: "Cakesicles — Standard Theme (per dozen)", unitPrice: 85 },
  "Cakesicles__Detailed Theme": { name: "Cakesicles — Detailed Theme (per dozen)", unitPrice: 105 },

  "Chocolate Covered Oreos__Standard": { name: "Chocolate Covered Oreos — Standard (per dozen)", unitPrice: 55 },
  "Chocolate Covered Oreos__Edible Image": { name: "Chocolate Covered Oreos — Edible Image (per dozen)", unitPrice: 68 },

  "Krispie Treats__Standard": { name: "Krispie Treats — Standard (per dozen)", unitPrice: 65 },
  "Krispie Treats__Detailed Theme": { name: "Krispie Treats — Detailed Theme (per dozen)", unitPrice: 80 },

  "Wafer Rods__Standard": { name: "Wafer Rods — Standard (per dozen)", unitPrice: 55 },
  "Wafer Rods__Detailed Theme": { name: "Wafer Rods — Detailed Theme (per dozen)", unitPrice: 70 },

  "Chocolate Covered Strawberries__Standard": { name: "Chocolate Covered Strawberries — Standard (per dozen)", unitPrice: 70 },
  "Chocolate Covered Strawberries__Detailed Theme": { name: "Chocolate Covered Strawberries — Detailed Theme (per dozen)", unitPrice: 85 },
};

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const body = await req.json();
    const items: IncomingItem[] = Array.isArray(body?.items) ? body.items : [];
    const customer = body?.customer || {};

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    let amount = 0;
    for (const i of items) {
      const p = CATALOG[i.id];
      if (!p) return NextResponse.json({ error: `Unknown item: ${i.id}` }, { status: 400 });
      const qty = Math.max(1, Math.min(99, Number(i.qty || 1)));
      amount += p.unitPrice * qty;
    }

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "nzd",
      automatic_payment_methods: { enabled: true },
      receipt_email: typeof customer?.email === "string" ? customer.email : undefined,
      metadata: { items: JSON.stringify(items) },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "PaymentIntent error" }, { status: 500 });
  }
}