export default function ContactSection() {
    return (
      <section id="contact" style={{ padding: "80px 0", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          
          <h2 style={{ 
            fontSize: 36, 
            marginBottom: 16, 
            fontWeight: 700 
          }}>
            Contact Us
          </h2>
  
          <p style={{ 
            marginBottom: 40, 
            fontSize: 16, 
            opacity: 0.8 
          }}>
            For custom orders, catering enquiries, or general questions — we’d love to hear from you.
          </p>
  
          <div style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}>
  
            {/* Email Card */}
            <a
              href="mailto:hello@sugarandbites.store"
              style={{
                padding: 24,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "inherit",
                background: "white",
                transition: "0.2s ease"
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
                Email
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                hello@sugarandbites.store
              </div>
            </a>
  
            {/* Phone Card */}
            <a
              href="tel:+64204821684"
              style={{
                padding: 24,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "inherit",
                background: "white",
                transition: "0.2s ease"
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
                Phone
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                020 482 1684
              </div>
            </a>
  
          </div>
        </div>
      </section>
    );
  }
