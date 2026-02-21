export default function ContactPage() {
  return (
    <main>
      <section className="container pageHeader">
        <h1 className="pageTitle">Contact</h1>
        <p className="pageSub">
          Send an enquiry and we’ll get back to you with options and pricing.
        </p>
      </section>

      <section className="container section">
        <div className="panel" style={{ padding: 22 }}>
          <p>
            Email: <strong>hello@sugarandbites.store</strong>
          </p>
          <p style={{ marginTop: 10 }}>
            Phone: <strong>020 482 1684</strong>
          </p>
        </div>
      </section>
    </main>
  );
}