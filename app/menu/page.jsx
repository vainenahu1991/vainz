import Link from "next/link";

export default function MenuPage() {
  return (
    <main>
      <section className="container pageHeader">
        <h1 className="pageTitle">Menu</h1>
        <p className="pageSub">
          Luxury sweet treats and curated charcuterie — created with care, style, and flavour.
        </p>
      </section>

      <section className="container section">
        <div className="menuGrid">
          {/* Sweet Treats card */}
          <div className="menuCard">
            <h2 className="menuCardTitle">Sweet Treats</h2>
            <div className="menuCardKicker">Priced per dozen</div>

            <p className="menuCardText">
              Choose your treat • choose your theme • we create the magic.
            </p>

            <ul className="menuList">
              <li>Cakesicles (per dozen)</li>
              <li>Krispie Treats (per dozen)</li>
              <li>Wafer Rods (per dozen)</li>
              <li>Chocolate Covered Oreos (per dozen)</li>
              <li>Chocolate Covered Strawberries (per dozen)</li>
            </ul>

            <div className="menuDivider" />

            <div className="menuSectionLabel">Theme inspiration</div>
            <p className="menuCardText">
              Birthday Glam • Barbie / Pink Luxe • Black &amp; Gold • Neutral Boho • Floral Garden • Moana / Island Vibes •
              Baby Shower • Gender Reveal • Corporate / Logo Treats • Wedding Elegance
            </p>

            <p className="menuNote">
              Note: Pricing shown in the Order section is per dozen. For custom themes, colours, or branding — add your notes
              at checkout.
            </p>

            <Link className="linkCta" href="/sugar">
              View pricing &amp; order →
            </Link>
          </div>

          {/* Charcuterie card */}
          <div className="menuCard">
            <h2 className="menuCardTitle">Charcuterie</h2>
            <div className="menuCardKicker">Custom quote</div>

            <p className="menuCardText">
              Our grazing is curated to suit your event size, style, and preferences. Charcuterie is quoted per order — send
              an enquiry and we’ll create a tailored spread.
            </p>

            <div className="menuSectionLabel">Cheese Selection</div>
            <ul className="menuList">
              <li>Brie, Camembert</li>
              <li>Cream Cheese, Goat Cheese</li>
              <li>Gouda, Havarti, Edam</li>
              <li>Aged Cheddar, Parmesan</li>
              <li>Blue Vein</li>
              <li>Smoked Cheddar (optional)</li>
            </ul>

            <div className="menuSectionLabel">Cured Meats</div>
            <ul className="menuList">
              <li>Salami (mild/spicy)</li>
              <li>Prosciutto</li>
              <li>Chorizo</li>
              <li>Pepperoni</li>
              <li>Ham / Serrano (optional)</li>
            </ul>

            <div className="menuSectionLabel">Dips &amp; Spreads</div>
            <ul className="menuList">
              <li>Hummus</li>
              <li>Tzatziki</li>
              <li>French Onion Dip</li>
              <li>Roasted Capsicum Dip</li>
              <li>Spinach &amp; Feta Dip</li>
              <li>Pesto (optional)</li>
              <li>Fig Paste / Quince Paste</li>
            </ul>

            <div className="menuSectionLabel">Add-Ons &amp; Extras</div>
            <ul className="menuList">
              <li>Olives (garlic/herb/marinated)</li>
              <li>Pickles / Gherkins</li>
              <li>Sundried Tomatoes</li>
              <li>Crackers (water/seeded) &amp; Crostini</li>
              <li>Fresh fruit (grapes, berries, apple, pear)</li>
              <li>Nuts (almonds, cashews, walnuts)</li>
              <li>Dried fruit (apricots, figs)</li>
              <li>Chocolate (buttons, shards, truffles)</li>
              <li>Honeycomb / Honey drizzle</li>
              <li>Jams &amp; chutneys</li>
            </ul>

            <p className="menuNote">
              How to order: Submit your enquiry through the Contact/Quote form with your date, location, guest numbers, and
              style — we’ll reply with options and pricing.
            </p>

            <Link className="linkCta" href="/bites">
              Request a quote →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}