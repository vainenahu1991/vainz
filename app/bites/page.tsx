"use client";

import { useState } from "react";

export default function BitesPage() {
  const [board, setBoard] = useState("Small board");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const mailto = () => {
    const subject = encodeURIComponent(`Charcuterie Quote Request — ${board}`);
    const body = encodeURIComponent(
      `Full name: ${name}\nEmail: ${email}\nBoard size: ${board}\n\nEvent details:\n${details}\n`
    );
    window.location.href = `mailto:hello@sugarandbites.store?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      {/* HERO (same ratio as Sugar) */}
      <section className="bitesHero">
        <div className="heroContent">
          <div className="kicker">GRAZING</div>
          <h1 className="pageTitle">Order Bites</h1>
          <p className="pageSub">
            Grazing boards &amp; platters — curated to suit your event size, style and preferences.
          </p>
        </div>
      </section>

      {/* FORM SECTION (tight + seamless like Sugar) */}
      <section className="container bitesSection">
        <div className="quoteWrap">
          {/* TOP BAR */}
          <div className="quoteTopBar">
            <div className="quoteTopLabel">GET IN TOUCH</div>
            <div className="quoteTopLinks">
              <a className="quoteTopLink" href="mailto:hello@sugarandbites.store">
                hello@sugarandbites.store
              </a>
              <a className="quoteTopLink" href="tel:+64204821684">
                020 482 1684
              </a>
            </div>
          </div>

          {/* GRID */}
          <div className="quoteGrid">
            {/* LEFT IMAGE */}
            <div className="quoteSide" aria-hidden="true">
              {/* you can swap this to a different photo anytime */}
              <img src="/images/hero.jpg" alt="" />
            </div>

            {/* FORM */}
            <div className="quoteFormCard">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mailto();
                }}
              >
                <input
                  className="field"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  className="field"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <select
                  className="field"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                >
                  <option>Small board</option>
                  <option>Medium board</option>
                  <option>Large board</option>
                  <option>Served grazing table</option>
                </select>

                <textarea
                  className="field fieldArea"
                  placeholder="Event details, guest count, dietary requirements..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />

                <button className="quoteBtn" type="submit">
                  REQUEST QUOTE
                </button>

                <p className="quoteHint">
                  Submit your enquiry with your date, location, guest numbers, and style — we’ll reply
                  with options and pricing.
                </p>
              </form>
            </div>

            {/* RIGHT IMAGE */}
            <div className="quoteSide" aria-hidden="true">
              <img src="/images/hero.jpg" alt="" />
            </div>
          </div>

          {/* QUOTE (simple, luxe, not a card) */}
          <div className="bitesQuote">
            <span className="bitesLine" />
            <p>“Beautifully curated, effortlessly delicious — crafted to elevate every occasion.”</p>
            <span className="bitesLine" />
          </div>
        </div>
      </section>

      <style jsx>{`
        /* HERO */
        .bitesHero {
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-image: url("/images/hero-bites-blur.jpg");
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
          max-width: 820px;
        }

        /* ✅ Seamless spacing like Sugar */
        .bitesSection {
          padding-top: 18px;
          padding-bottom: 90px;
        }

        .quoteWrap {
          margin-top: -10px;
        }

        /* TOP BAR */
        .quoteTopBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          border-top: 1px solid #e4ddd4;
          padding-top: 14px;
          gap: 20px;
        }

        .quoteTopLabel {
          letter-spacing: 2px;
          font-size: 13px;
          color: #8a7e73;
          white-space: nowrap;
        }

        .quoteTopLinks {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .quoteTopLink {
          color: #3f3933;
          text-decoration: none;
          font-size: 16px;
          border-bottom: 1px solid rgba(197, 163, 92, 0.5);
          padding-bottom: 2px;
        }

        /* GRID */
        .quoteGrid {
          display: grid;
          grid-template-columns: 1fr minmax(520px, 640px) 1fr;
          gap: 44px;
          align-items: stretch;
          margin-top: 10px;
        }

        .quoteGrid > * {
          height: 100%;
        }

        .quoteSide {
          border-radius: 34px;
          overflow: hidden;
          display: flex;
          min-height: 100%;
        }

        .quoteSide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }

        .quoteFormCard {
          background: #ffffff;
          padding: 54px;
          border-radius: 34px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .field {
          width: 100%;
          padding: 16px 18px;
          margin-bottom: 20px;
          border-radius: 16px;
          border: 1px solid #e0d8cf;
          font-size: 15px;
          background: #faf8f6;
          outline: none;
        }

        .field:focus {
          border-color: rgba(197, 163, 92, 0.9);
          box-shadow: 0 0 0 4px rgba(197, 163, 92, 0.15);
        }

        .fieldArea {
          min-height: 140px;
          resize: vertical;
        }

        .quoteBtn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          background: #1f1f1f;
          color: white;
          font-weight: 650;
          letter-spacing: 1.2px;
          cursor: pointer;
          margin: 6px 0 14px;
          transition: 0.25s ease;
        }

        .quoteBtn:hover {
          background: #c5a35c;
          color: #1f1f1f;
        }

        .quoteHint {
          font-size: 13px;
          color: #8a7e73;
          line-height: 1.55;
          margin: 0;
        }

        /* QUOTE */
        .bitesQuote {
          margin-top: 60px;
          text-align: center;
          padding: 0 16px;
        }

        .bitesQuote p {
          font-family: "Georgia", "Times New Roman", serif;
          font-size: 20px;
          color: #4a4036;
          max-width: 720px;
          margin: 22px auto;
          line-height: 1.65;
        }

        .bitesLine {
          display: block;
          height: 2px;
          width: 220px;
          background: linear-gradient(to right, transparent, #c5a35c, transparent);
          margin: 0 auto;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .quoteGrid {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .quoteSide {
            display: none;
          }

          .quoteFormCard {
            padding: 38px;
          }
        }

        @media (max-width: 768px) {
          .bitesHero {
            height: 420px;
          }

          .pageTitle {
            font-size: 48px;
          }

          .heroContent {
            padding: 28px;
          }

          .bitesSection {
            padding-top: 10px;
          }

          .quoteWrap {
            margin-top: 0;
          }
        }

        @media (max-width: 520px) {
          .pageTitle {
            font-size: 42px;
          }

          .quoteTopBar {
            flex-direction: column;
            align-items: flex-start;
          }

          .quoteTopLinks {
            justify-content: flex-start;
            gap: 14px;
          }

          .bitesLine {
            width: 160px;
          }
        }
      `}</style>
    </main>
  );
}