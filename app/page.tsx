import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="container">
        <div className="hero">
          <img
            className="heroImg"
            src="/images/hero-sugar-display.jpg"
            alt="Sugar & Bites Luxury Catering"
          />
          <div className="heroOverlay" />

          <div className="heroInner">
            <div className="heroKicker">Luxury Catering</div>

            <div className="heroTitle">
              Sugar{" "}
              <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
                &
              </span>{" "}
              Bites
            </div>

            <div className="heroSub">
              Curated sweet treats and elegant charcuterie boards for unforgettable moments.
            </div>

            <div className="heroActions">
              <Link className="heroBtn heroBtnPrimary" href="/sugar">
                Order Sweet Treats
              </Link>

              <Link className="heroBtn heroBtnGhost" href="/bites">
                Request Charcuterie
              </Link>
            </div>
          </div>
        </div>

        <div className="subNote">
          Pickup &amp; Delivery • Afterpay available at checkout
        </div>
      </section>

      {/* ================= CHARCUTERIE SECTION (image left / text right) ================= */}
      <section className="container section">
        <div className="split">
          <div className="splitMedia">
            <img
              className="imgCover"
              src="/images/charcuterie-board-2.jpg"
              alt="Luxury charcuterie grazing board"
            />
          </div>

          <div className="splitText">
            <div className="kicker">Charcuterie</div>
            <h2 style={{ marginTop: 10 }}>Grazing boards &amp; platters</h2>

            <p style={{ marginTop: 12, maxWidth: 520 }}>
              Elegant boards curated with premium ingredients — perfect for events,
              corporate functions, celebrations and intimate gatherings.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link className="linkCta" href="/contact">
                Request a quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SWEET TREATS SECTION (text left / image right) ================= */}
      <section className="container section">
        <div className="split splitReverse">
          <div className="splitText">
            <div className="kicker">Sweet Treats</div>
            <h2 style={{ marginTop: 10 }}>Custom desserts &amp; gift boxes</h2>

            <p style={{ marginTop: 12, maxWidth: 520 }}>
              Cakesicles, chocolate-dipped treats, themed desserts and beautifully
              packaged gift boxes — made to impress and designed to match your vision.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link className="linkCta" href="/sugar">
                View pricing &amp; order →
              </Link>
            </div>
          </div>

          <div className="splitMedia">
            <img
              className="imgCover"
              src="/images/cakesicles.jpg"
              alt="Custom cakesicles dessert display"
            />
          </div>
        </div>
      </section>
    </main>
  );
}