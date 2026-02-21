export default function HeroTemp({
  title,
  subtitle,
  imageSrc,
  kicker = "Luxury Catering",
  primaryCtaLabel = "Explore Menu",
  primaryCtaHref = "/menu",
  secondaryCtaLabel = "Enquire Now",
  secondaryCtaHref = "/contact",
}: {
  title: string;
  subtitle?: string;
  imageSrc: string;
  kicker?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  return (
    <section className="container hero">
      <div className="panel heroPanel">
        <div className="heroMedia">
          <img className="heroImg" src={imageSrc} alt={title} />
          <div className="heroOverlay" />
          <div className="heroContent">
            <div className="kicker">{kicker}</div>
            <h1 className="heroTitle">{title}</h1>
            {subtitle ? <p className="heroSub">{subtitle}</p> : null}
            <div className="heroActions">
              <a className="btn btnGold" href={primaryCtaHref} style={{ textDecoration: "none" }}>
                {primaryCtaLabel}
              </a>
              <a className="btn btnGhost" href={secondaryCtaHref} style={{ textDecoration: "none" }}>
                {secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}