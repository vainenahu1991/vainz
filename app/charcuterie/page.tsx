"use client";

import { useState } from "react";
import Image from "next/image";

const BOARD_IMAGE =
  "/images/charcuterie-board-2.png";

export default function CharcuteriePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-[#faf9f7] text-[#1c1c1c] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <header className="text-center mb-14">
          <p className="font-serif text-[#b8860b] text-sm uppercase tracking-[0.2em] mb-2">
            Request a quote
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide">
            Charcuterie Boards
          </h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
            Elegant grazing boards for celebrations, weddings, corporate events
            and intimate gatherings.
          </p>
        </header>

        <div className="reflection rounded-2xl overflow-hidden aspect-[16/10] relative mb-14 max-w-2xl mx-auto">
          <Image
            src={BOARD_IMAGE}
            alt="Charcuterie board"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        {submitted ? (
          <div className="reflection rounded-2xl p-10 sm:p-14 text-center max-w-lg mx-auto">
            <p className="font-serif text-2xl font-light text-[#1c1c1c] mb-2">
              Thank you for your enquiry
            </p>
            <p className="text-neutral-600 mb-8">
              We’ll be in touch shortly with a quote and next steps.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-gold px-8 py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="reflection rounded-2xl p-8 sm:p-10 space-y-6 max-w-lg mx-auto"
          >
            <input
              type="text"
              placeholder="Full name"
              required
              className="w-full border border-neutral-200 rounded-xl px-4 py-3.5 text-[#1c1c1c] placeholder-neutral-400 focus:border-[#b8860b]/50 focus:ring-1 focus:ring-[#b8860b]/30 outline-none transition-shadow"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border border-neutral-200 rounded-xl px-4 py-3.5 text-[#1c1c1c] placeholder-neutral-400 focus:border-[#b8860b]/50 focus:ring-1 focus:ring-[#b8860b]/30 outline-none transition-shadow"
            />
            <select
              className="w-full border border-neutral-200 rounded-xl px-4 py-3.5 text-[#1c1c1c] bg-white focus:border-[#b8860b]/50 focus:ring-1 focus:ring-[#b8860b]/30 outline-none"
              aria-label="Board size"
            >
              <option>Small board</option>
              <option>Medium board</option>
              <option>Large / event platter</option>
            </select>
            <textarea
              placeholder="Event details, guest count, dietary requirements…"
              className="w-full border border-neutral-200 rounded-xl px-4 py-3.5 min-h-[120px] text-[#1c1c1c] placeholder-neutral-400 focus:border-[#b8860b]/50 focus:ring-1 focus:ring-[#b8860b]/30 outline-none resize-y"
            />
            <button
              type="submit"
              className="w-full btn-gold py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider transition-all"
            >
              Request quote
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
